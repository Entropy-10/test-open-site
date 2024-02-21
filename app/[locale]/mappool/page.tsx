import { createMetadata } from '@metadata'
import { getTranslations } from 'next-intl/server'

import type { MetadataProps } from '@types'
import ComingSoon from '~/components/coming-soon'

export async function generateMetadata({ params: { locale } }: MetadataProps) {
	const t = await getTranslations({ locale, namespace: 'Metadata' })
	return createMetadata({
		locale,
		title: t('PageTitles.mappool'),
		description: t('description')
	})
}

export default function MappoolPage() {
	return <ComingSoon />
}
