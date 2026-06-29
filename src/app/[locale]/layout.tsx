import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/react'

import { genOgTwitterImage } from '@metadata'
import { routing } from '@navigation'
import { createClient } from '@supabase/server'
import { cn, getBaseUrl, inter, isPreview } from '@utils/client'
import '~/styles/globals.css'

import Footer from './_components/footer'
import Header from './_components/header'
import PreviewWarning from './_components/preview-warning'
import UpdateScopes from './_components/update-scopes'

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale()
	const t = await getTranslations({ locale, namespace: 'Metadata' })

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
		})
	} satisfies Metadata
}

interface LocaleLayoutProps {
	children: ReactNode
}

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
	const locale = await getLocale()
	if (!hasLocale(routing.locales, locale)) notFound()

	const supabase = await createClient()
	const { data: tokenState } = await supabase
		.from('tokens')
		.select('old')
		.maybeSingle()

	return (
		<html lang={locale} className='scroll-smooth!'>
			<body
				className={cn(
					'flex min-h-screen flex-col overflow-x-hidden',
					inter.className
				)}
			>
				<NextIntlClientProvider>
					<Header />
					{isPreview && <PreviewWarning />}
					{tokenState?.old && <UpdateScopes />}
					<main className='flex-1'>{children}</main>
					<Footer />
					<Analytics />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
