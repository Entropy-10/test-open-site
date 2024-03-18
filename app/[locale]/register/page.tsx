import { createMetadata } from '@metadata'
import { getSession } from '@session'
import { getMessages, getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

import Background from '~/components/ui/background'

import { env } from '@env'
import type { MetadataProps } from '@types'
import { isProd } from '@utils/client'
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
		<Background className='flex min-h-screen items-center justify-center'>
			<MessageBox
				title='REGISTRATIONS CLOSED!'
				message='Registrations are currently closed. If you are a free player trying to create a team please contact @__entro.'
			/>
		</Background>
	)

	// return (
	// 	<Background className='relative flex min-h-screen items-center justify-center'>
	// 		<div className='absolute top-10 left-0'>
	// 			<Heading>{t('heading')}</Heading>
	// 			<Divider />
	// 		</div>

	// 		{allowRegs ? (
	// 			<NextIntlClientProvider messages={pick(messages, 'RegistrationPage')}>
	// 				<CreateTeamForm
	// 					osuId={session.sub}
	// 					discordId={session.user.discord_id}
	// 				/>
	// 			</NextIntlClientProvider>
	// 		) : (
	// 			<MessageBox title={t('Closed.title')} message={t('Closed.message')} />
	// 		)}
	// 	</Background>
	// )
}
