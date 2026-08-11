import "~/styles/globals.css"

import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NextIntlClientProvider } from "next-intl"
import { getLocale } from "next-intl/server"
import { Inter } from "next/font/google"

import { Footer } from "~/components/footer"
import { routing } from "~/i18n/routing"

export const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = { title: "TEST Open" }

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale()

  return (
    <html lang={locale} className={`${inter.className} antialiased`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <NextIntlClientProvider>
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
