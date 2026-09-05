import { getLocale, getTranslations } from "next-intl/server"
import type { Locale } from "next-intl"

import { createMetadata } from "~/utils/metadata"

export async function generateMetadata() {
  const locale = await getLocale()

  const t = await getTranslations({ locale, namespace: "Metadata" })
  return createMetadata({
    locale,
    title: t("PageTitles.info"),
    description: t("description")
  })
}

function loadContent(locale: Locale) {
  return import(`./${locale}.mdx`)
}

export default async function InfoPage() {
  const locale = await getLocale()
  const { default: Content } = await loadContent(locale)

  return <Content />
}
