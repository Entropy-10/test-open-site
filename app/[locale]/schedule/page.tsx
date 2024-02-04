import { createMetadata } from '@metadata'
import { getTranslations } from 'next-intl/server'

import ComingSoon from '~/components/coming-soon'

import type { MetadataProps } from '@types'

export async function generateMetadata({ params: { locale } }: MetadataProps) {
	const t = await getTranslations({ locale, namespace: 'Metadata' })
	return createMetadata({
		locale,
		title: t('PageTitles.schedule'),
		description: t('description')
	})
}

export default function SchedulePage() {
	return <ComingSoon />
}
