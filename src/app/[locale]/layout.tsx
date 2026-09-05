import "~/styles/globals.css"

import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getTranslations } from "next-intl/server"
import { Inter } from "next/font/google"

import { Footer } from "~/components/footer"
import { Header } from "~/components/header"
import { routing } from "~/i18n/routing"
import { genOgTwitterImage } from "~/utils/metadata"
import { getBaseUrl } from "~/utils/site"

export const inter = Inter({ subsets: ["latin"] })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "Metadata" })

  return {
    metadataBase: new URL(getBaseUrl()),
    title: {
      template: "%s • TEST Open",
      default: "TEST Open"
    },
    description: t("description"),
    ...genOgTwitterImage({
      title: {
        template: "%s",
        default: "TEST Open"
      },
      description: t("description"),
      locale
    })
  } satisfies Metadata
}

export default async function RootLayout({
  children
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale()

  return (
    <html lang={locale} className={`${inter.className} antialiased`}>
      <body className="bg-milky-white flex min-h-screen flex-col overflow-x-hidden">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
