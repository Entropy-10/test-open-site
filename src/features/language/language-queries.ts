"use server"

import { cacheLife, cacheTag } from "next/cache"

import * as v from "valibot"
import { ENV } from "varlock/env"

import { log, serializeError } from "~/lib/evlog"

const baseUrl = "https://api.crowdin.com/api/v2"

const wordStatsSchema = v.object({
  total: v.number(),
  translated: v.number(),
  preTranslateAppliedTo: v.number(),
  approved: v.number()
})

const qaChecksStatusSchema = v.object({
  total: v.number(),
  inProgress: v.number(),
  passed: v.number(),
  failed: v.number()
})

const languageSchema = v.object({
  id: v.string(),
  name: v.string(),
  editorCode: v.string(),
  twoLettersCode: v.string(),
  threeLettersCode: v.string(),
  locale: v.string(),
  androidCode: v.string(),
  osxCode: v.string(),
  osxLocale: v.string(),
  pluralCategoryNames: v.array(v.string()),
  pluralRules: v.string(),
  pluralExamples: v.array(v.string()),
  textDirection: v.picklist(["ltr", "rtl"]),
  dialectOf: v.nullable(v.string())
})

const progressDataSchema = v.object({
  words: wordStatsSchema,
  phrases: wordStatsSchema,
  translationProgress: v.pipe(v.number(), v.minValue(0), v.maxValue(100)),
  approvalProgress: v.pipe(v.number(), v.minValue(0), v.maxValue(100)),
  qaChecksStatus: qaChecksStatusSchema,
  languageId: v.string(),
  language: languageSchema
})

const paginationSchema = v.object({
  offset: v.number(),
  limit: v.number()
})

const languageProgressResponseSchema = v.object({
  data: v.array(
    v.object({
      data: progressDataSchema
    })
  ),
  pagination: paginationSchema
})

export async function getTranslationProgress() {
  "use cache"
  cacheLife("days")
  cacheTag("language-progress")

  let responseJson: unknown
  try {
    const res = await fetch(
      `${baseUrl}/projects/${ENV.CROWDIN_PROJECT_ID}/languages/progress`,
      { headers: { Authorization: `Bearer ${ENV.CROWDIN_TOKEN}` } }
    )

    if (!res.ok) {
      log.error({
        component: "language-progress",
        message: "Crowdin rejected the progress request",
        httpStatus: res.status
      })
      return null
    }

    responseJson = await res.json()
  } catch (error) {
    log.error({
      component: "language-progress",
      message: "Could not reach Crowdin",
      error: serializeError(error)
    })
    return null
  }

  const { success, output, issues } = v.safeParse(
    languageProgressResponseSchema,
    responseJson
  )

  if (!success) {
    log.error({
      component: "language-progress",
      message: "Unexpected Crowdin response shape",
      issues: issues.map((issue) => issue.message)
    })
    return null
  }

  return output.data.map(({ data: { language, translationProgress } }) => ({
    code: language.editorCode,
    progress: translationProgress
  }))
}
