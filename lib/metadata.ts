import { getBaseUrl } from '@utils/client'

import type { Metadata } from 'next'
import type { TemplateString } from 'next/dist/lib/metadata/types/metadata-types'

interface MetadataOptions {
	locale: string
	title: string | TemplateString
	description: string
}

export function createMetadata({
	locale,
	title,
	description
}: MetadataOptions) {
	return {
		title,
		description,
		...genOgTwitterImage({ locale, title, description })
	}
}

export function genOgTwitterImage({
	locale,
	title,
	description
}: MetadataOptions) {
	return {
		openGraph: {
			locale,
			type: 'website',
			siteName: 'TEST Open',
			url: new URL(getBaseUrl()),
			title,
			description,
			images: {
				url: new URL(`/${locale}/opengraph-image.png`, getBaseUrl()),
				width: 1024,
				height: 512,
				alt: 'TEST Open',
				type: 'image/png'
			}
		},
		twitter: {
			title,
			creator: '@__entro',
			site: '@TESTOpen_lazer',
			description,
			card: 'summary_large_image',
			images: {
				url: new URL(`/${locale}/opengraph-image.png`, getBaseUrl()),
				width: 1024,
				height: 512,
				alt: 'TEST Open',
				type: 'image/png'
			}
		}
	} satisfies Metadata
}
