import * as rootParams from "next/root-params"

import deepmerge from "deepmerge"
import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"

import { routing } from "./routing"

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale()
    // oxlint-disable-next-line no-param-reassign
    locale = hasLocale(routing.locales, paramValue)
      ? paramValue
      : routing.defaultLocale
  }

  const userMessages = (await import(`../../messages/${locale}.json`)).default
  const defaultMessages = (await import("../../messages/en.json")).default

  return { locale, messages: deepmerge(defaultMessages, userMessages) }
})
