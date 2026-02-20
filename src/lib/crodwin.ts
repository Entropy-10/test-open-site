import z from 'zod'

import { env } from '@env'

const baseUrl = 'https://api.crowdin.com/api/v2'

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
	textDirection: z.enum(['ltr', 'rtl']),
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

export const languageProgressResponseSchema = z.object({
	data: z.array(
		z.object({
			data: progressDataSchema
		})
	),
	pagination: paginationSchema
})

export async function getTranslationProgress() {
	const res = await fetch(
		`${baseUrl}/projects/${env.CROWDIN_PROJECT_ID}/languages/progress`,
		{ headers: { Authorization: `Bearer ${env.CROWDIN_TOKEN}` } }
	)
	const resJson = await res.json()
	const { success, data } = languageProgressResponseSchema.safeParse(resJson)

	if (!success || 'error' in data) return null

	return data.data.map(({ data }) => ({
		code: data.language.editorCode,
		progress: data.translationProgress
	}))
}
