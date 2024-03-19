import { createMetadata } from '@metadata'
import { getSession } from '@session'
import { createClient } from '@supabase/server'
import { getMessages, getTranslations } from 'next-intl/server'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import MessageBox from '~/components/message-box'
import SectionLoader from '~/components/section-loader'
import Background from '~/components/ui/background'
import Button from '~/components/ui/button'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import Invites from './_components/invites'
import Players from './_components/players'

import type { MetadataProps } from '@types'
import { NextIntlClientProvider } from 'next-intl'
import Editor from './_components/editor'

export async function generateMetadata({ params: { locale } }: MetadataProps) {
	const t = await getTranslations({ locale, namespace: 'Metadata' })
	return createMetadata({
		locale,
		title: t('PageTitles.team'),
		description: t('description')
	})
}

export default async function TeamPage() {
	const session = await getSession()
	const locale = cookies().get('NEXT_LOCALE')?.value ?? 'en'
	const csrfToken = headers().get('X-CSRF-Token') ?? 'missing'
	if (!session) redirect('/unauthorized')

	const messages = await getMessages()
	const t = await getTranslations('TeamPage')
	const buttonT = await getTranslations('Buttons')
	const supabase = createClient(cookies())

	const { data } = await supabase
		.from('players')
		.select('role, teams(*)')
		.eq('user_id', session.sub)
		.maybeSingle()

	if (!data?.teams) {
		return (
			<Background className='flex min-h-screen items-center justify-center'>
				<MessageBox
					title={t('Errors.NotOnTeam.title')}
					message={t('Errors.NotOnTeam.message')}
				>
					<Button variant='outline' href='/profile'>
						{t('Errors.NotOnTeam.profileButton')}
					</Button>
				</MessageBox>
			</Background>
		)
	}

	const team = data.teams
	const isCaptain = data.role === 'captain'

	return (
		<div>
			<Background className='py-8'>
				<Heading>{t('Headings.team')}</Heading>
				<Divider />
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Editor userId={session.sub} isCaptain={isCaptain} team={team} />
				</NextIntlClientProvider>
			</Background>

			<section className='py-8 text-light-blue'>
				<Heading>{t('Headings.player')}</Heading>
				<Divider className='bg-light-blue' />
				<Heading sub>{t('Players.heading')}</Heading>

				<Suspense fallback={<SectionLoader className='h-[311px]' />}>
					<Players
						teamId={team.id}
						userId={session.sub}
						isCaptain={isCaptain}
					/>
				</Suspense>

				<Divider variant='single' className='bg-light-blue' />
				<Heading sub>{t('Invites.heading')}</Heading>

				{/* {isCaptain && (
					<Search
						teamId={team.id}
						inviteButtonText={t('Invites.Invite.inviteButton')}
						placeholderText={t('Invites.Invite.placeholder')}
						closeButtonText={buttonT('close')}
					/>
				)} */}
				<Suspense fallback={<SectionLoader className='h-[311px]' />}>
					<Invites teamId={team.id} isCaptain={isCaptain} />
				</Suspense>
			</section>
		</div>
	)
}
