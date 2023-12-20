import { getTranslations } from 'next-intl/server'
import { createMetadata } from '@metadata'

import ComingSoon from '~/components/coming-soon'

import type { MetadataProps } from '@types'

export async function generateMetadata({ params: { locale } }: MetadataProps) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return createMetadata({
    locale,
    title: t('PageTitles.signIn'),
    description: t('description')
  })
}

export default function SignInPage() {
  return <ComingSoon />
}
