import { getTranslationProgress } from "../language-queries"
import { LanguagePicker } from "./language-picker"

export async function LanguageWrapper() {
  const languagesProgress = await getTranslationProgress()

  return <LanguagePicker progress={languagesProgress} />
}
