import Crodwin from '@crowdin/crowdin-api-client'
import { env } from '@env'

export const crowdinApi = new Crodwin({ token: env.CROWDIN_TOKEN })

export async function getTranslationProgress() {
	try {
		const status = await crowdinApi.translationStatusApi.getProjectProgress(
			Number(env.CROWDIN_PROJECT_ID)
		)

		return status.data.map(status => ({
			code: status.data.language.editorCode,
			progress: status.data.translationProgress
		}))
	} catch (err) {
		return null
	}
}
