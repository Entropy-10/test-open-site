import '~/styles/globals.css'

import { genOgTwitterImage } from '@metadata'
import { locales } from '@siteConfig'
import { cn, getBaseUrl, inter, isPreview } from '@utils/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import Footer from './_components/footer'
import Header from './_components/header'

import { createClient } from '@supabase/server'
import type { MetadataProps } from '@types'
import pick from 'lodash/pick'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { cookies, headers } from 'next/headers'
import type { ReactNode } from 'react'
import PreviewWarning from './_components/preview-warning'
import UpdateScopes from './_components/update-scopes'

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

export default async function LocaleLayout({
	children,
	params: { locale }
}: LocaleLayoutProps) {
	if (!locales.includes(locale)) notFound()
	const messages = await getMessages()

	const supabase = createClient(cookies())
	const { data: tokenState } = await supabase
		.from('tokens')
		.select('old')
		.maybeSingle()

	return (
		<html lang={locale} className='!scroll-smooth'>
			<body
				className={cn(
					'flex min-h-screen flex-col overflow-x-hidden',
					inter.className
				)}
			>
				<NextIntlClientProvider
					locale={locale}
					messages={pick(messages, 'ErrorPage')}
				>
					<Header />
					{isPreview && <PreviewWarning />}
					{tokenState?.old && <UpdateScopes />}
					<main className='flex-1'>{children}</main>
					<Footer />
				</NextIntlClientProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
