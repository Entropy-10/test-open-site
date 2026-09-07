import { defineRouting } from "next-intl/routing"

import { locales } from "./locales"

export const routing = defineRouting({
  locales,
  localePrefix: "as-needed",
  defaultLocale: "en"
})
