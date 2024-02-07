import { createMetadata } from '@metadata'
import { getSession } from '@session'
import { getMessages, getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

import Background from '~/components/ui/Background'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import CreateTeamForm from './_components/create-team-form'

import { env } from '@env'
import type { MetadataProps } from '@types'
import { isProd } from '@utils/client'
import pick from 'lodash/pick'
import { NextIntlClientProvider } from 'next-intl'
import MessageBox from '~/components/message-box'

export async function generateMetadata({ params: { locale } }: MetadataProps) {
	const t = await getTranslations({ locale, namespace: 'Metadata' })
	return createMetadata({
		locale,
		title: t('PageTitles.register'),
		description: t('description')
	})
}

export default async function RegisterPage() {
	const session = await getSession()
	if (!session) redirect('/unauthorized')

	const t = await getTranslations('RegistrationPage')
	const messages = await getMessages()
	const allowRegs = isProd
		? Date.now() >= Number(env.NEXT_PUBLIC_START_DATE)
		: true

	return (
		<Background className='relative flex min-h-screen items-center justify-center'>
			<div className='absolute top-10 left-0'>
				<Heading>{t('heading')}</Heading>
				<Divider />
			</div>

			{allowRegs ? (
				<NextIntlClientProvider
					messages={pick(messages, 'RegistrationPage.Form')}
				>
					<CreateTeamForm
						osuId={session.sub}
						discordId={session.user.discord_id}
					/>
				</NextIntlClientProvider>
			) : (
				<MessageBox title={t('Closed.title')} message={t('Closed.message')} />
			)}
		</Background>
	)
}
