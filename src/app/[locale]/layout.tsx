import "~/styles/globals.css"

import type { Metadata } from "next"

import { NextIntlClientProvider } from "next-intl"
import { Inter } from "next/font/google"

import { Footer } from "~/components/footer"
import { routing } from "~/i18n/routing"

export const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = { title: "TEST Open" }

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default function RootLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <html lang="en" className={`${inter.className} antialiased`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <NextIntlClientProvider>
          <main className="flex-1">
            {children}
            <Footer />
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
