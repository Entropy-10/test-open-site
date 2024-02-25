import { cookies } from 'next/headers'
import { getTranslationProgress } from '~/lib/crodwin'
import LanguagePicker from './language-picker'

export default async function LanguageWrapper() {
	const locale = cookies().get('NEXT_LOCALE')?.value ?? 'en'
	const languagesProgress = await getTranslationProgress()

	return <LanguagePicker locale={locale} progress={languagesProgress} />
}
