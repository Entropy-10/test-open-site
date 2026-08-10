import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: [
    "en",
    "fr",
    "es",
    "ru",
    "ko",
    "ja",
    "zh",
    "de",
    "tl",
    "pl",
    "pt-br"
  ],
  localePrefix: "as-needed",
  defaultLocale: "en"
})
