export const locales = [
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
] as const

export type Locale = (typeof locales)[number]

export interface LocaleMetadata {
  code: Locale
  name: string
  flag: string
  editorCode?: string
}

export const localesMetadata: LocaleMetadata[] = [
  { code: "en", name: "English", flag: "en.svg" },
  { code: "fr", name: "Français", flag: "fr.svg" },
  { code: "es", name: "Español", flag: "es.svg" },
  { code: "ru", name: "Русский", flag: "ru.svg" },
  { code: "ko", name: "한국어", flag: "ko.svg" },
  { code: "ja", name: "日本語", flag: "ja.svg" },
  { code: "zh", editorCode: "zhcn", name: "中文", flag: "zh.svg" },
  { code: "de", name: "Deutsch", flag: "de.svg" },
  { code: "tl", name: "Tagalog", flag: "tl.svg" },
  { code: "pl", name: "Polski", flag: "pl.svg" },
  { code: "pt-br", editorCode: "ptbr", name: "Português", flag: "pt-br.svg" }
]
