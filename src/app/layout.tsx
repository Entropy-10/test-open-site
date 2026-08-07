import "../styles/globals.css"

import type { Metadata } from "next"

import { Inter } from "next/font/google"

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = { title: "TEST Open" }

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
