import { getLocale } from "next-intl/server"
import type { Locale } from "next-intl"

// Kept out of the component: React Compiler cannot lower an import expression.
function loadContent(locale: Locale) {
  return import(`./${locale}.mdx`)
}

export default async function InfoPage() {
  const locale = await getLocale()
  const { default: Content } = await loadContent(locale)

  return <Content />
}
