import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import pick from 'lodash/pick'

import { createMetadata } from '@metadata'

import Background from '~/components/ui/background'
import HeaderDivider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import MappoolContainer from './_components/mappool-container'

export async function generateMetadata() {
	const locale = await getLocale()

	const t = await getTranslations({ locale, namespace: 'Metadata' })
	return createMetadata({
		locale,
		title: t('PageTitles.mappool'),
		description: t('description')
	})
}

export default async function MappoolPage() {
	const [t, messages] = await Promise.all([
		getTranslations('MappoolPage'),
		getMessages()
	])
	// TODO: fix this
	const defaultRound = 'grand finals'

	return (
		<div className='relative'>
			<Background className='py-8'>
				<Heading>{t('heading')}</Heading>
				<HeaderDivider className='max-w-[180px] sm:max-w-[280px] md:max-w-[310px] lg:max-w-[360px]' />
			</Background>

			<NextIntlClientProvider messages={pick(messages, 'MappoolPage')}>
				<MappoolContainer defaultRound={defaultRound} />
			</NextIntlClientProvider>
		</div>
	)
}
