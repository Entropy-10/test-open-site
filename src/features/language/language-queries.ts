"use server"

import { cacheLife, cacheTag } from "next/cache"

import { ENV } from "varlock/env"
import { z } from "zod"

import { log, serializeError } from "~/lib/evlog"

const baseUrl = "https://api.crowdin.com/api/v2"

const wordStatsSchema = z.object({
  total: z.number(),
  translated: z.number(),
  preTranslateAppliedTo: z.number(),
  approved: z.number()
})

const qaChecksStatusSchema = z.object({
  total: z.number(),
  inProgress: z.number(),
  passed: z.number(),
  failed: z.number()
})

const languageSchema = z.object({
  id: z.string(),
  name: z.string(),
  editorCode: z.string(),
  twoLettersCode: z.string(),
  threeLettersCode: z.string(),
  locale: z.string(),
  androidCode: z.string(),
  osxCode: z.string(),
  osxLocale: z.string(),
  pluralCategoryNames: z.array(z.string()),
  pluralRules: z.string(),
  pluralExamples: z.array(z.string()),
  textDirection: z.enum(["ltr", "rtl"]),
  dialectOf: z.string().nullable()
})

const progressDataSchema = z.object({
  words: wordStatsSchema,
  phrases: wordStatsSchema,
  translationProgress: z.number().min(0).max(100),
  approvalProgress: z.number().min(0).max(100),
  qaChecksStatus: qaChecksStatusSchema,
  languageId: z.string(),
  language: languageSchema
})

const paginationSchema = z.object({
  offset: z.number(),
  limit: z.number()
})

const languageProgressResponseSchema = z.object({
  data: z.array(
    z.object({
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

  const { success, data, error } =
    languageProgressResponseSchema.safeParse(responseJson)

  if (!success || "error" in data) {
    log.error({
      component: "language-progress",
      message: "Unexpected Crowdin response shape",
      issues: error?.issues.map((issue) => issue.message)
    })
    return null
  }

  return data.data.map(({ data: { language, translationProgress } }) => ({
    code: language.editorCode,
    progress: translationProgress
  }))
}
