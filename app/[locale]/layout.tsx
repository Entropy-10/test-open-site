import '~/styles/globals.css'

import { genOgTwitterImage } from '@metadata'
import { locales } from '@siteConfig'
import { cn, getBaseUrl, inter } from '@utils/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import Footer from './_components/footer'
import Header from './_components/header'

import type { MetadataProps } from '@types'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import type { ReactNode } from 'react'

export async function generateMetadata({ params: { locale } }: MetadataProps) {
	const t = await getTranslations({ locale, namespace: 'Metadata' })
	const csrfToken = headers().get('X-CSRF-Token') || 'missing'

	return {
		metadataBase: new URL(getBaseUrl()),
		title: {
			template: '%s • TEST Open',
			default: 'TEST Open'
		},
		description: t('description'),
		...genOgTwitterImage({
			title: {
				template: '%s',
				default: 'TEST Open'
			},
			description: t('description'),
			locale
		}),
		other: { 'x-csrf-token': csrfToken }
	} satisfies Metadata
}

interface LocaleLayoutProps {
	children: ReactNode
	params: { locale: string }
}

export default function LocaleLayout({
	children,
	params: { locale }
}: LocaleLayoutProps) {
	if (!locales.includes(locale)) notFound()

	return (
		<html lang={locale} className='!scroll-smooth'>
			<body
				className={cn(
					'flex min-h-screen flex-col overflow-x-hidden',
					inter.className
				)}
			>
				<Header />
				<main className='flex-1'>{children}</main>
				<Footer />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
