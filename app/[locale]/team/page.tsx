import { createMetadata } from '@metadata'
import { getSession } from '@session'
import { createClient } from '@supabase/server'
import { getTranslations } from 'next-intl/server'
import { cookies, headers } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import MessageBox from '~/components/message-box'
import SectionLoader from '~/components/section-loader'
import Background from '~/components/ui/Background'
import Button from '~/components/ui/Button'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import { deleteTeam } from './_actions/delete-team'
import Invites from './_components/invites'
import Players from './_components/players'
import Search from './_components/search'

import type { MetadataProps } from '@types'

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
	const csrfToken = headers().get('X-CSRF-Token') ?? 'missing'
	if (!session) redirect('/unauthorized')

	const t = await getTranslations('TeamPage')
	const supabase = createClient(cookies())

	const { data } = await supabase
		.from('players')
		.select('role, teams(*)')
		.eq('user_id', session.sub)
		.maybeSingle()

	if (!data?.teams)
		return (
			<Background className='flex min-h-screen items-center justify-center'>
				<MessageBox
					title='NOT ON A TEAM!'
					message='Looks like you currently are not on a team. Please go to your profile and accept an invite first.'
				>
					<Button variant='outline' href='/profile'>
						PROFILE
					</Button>
				</MessageBox>
			</Background>
		)

	const team = data.teams
	const isCaptain = data.role === 'captain'

	return (
		<div>
			<Background className='py-8'>
				<Heading>{t('Headings.team')}</Heading>
				<Divider />

				<section className='padding space-y-4'>
					<div className='flex gap-3'>
						<Image
							width={180}
							height={80}
							src={team.flag}
							alt='team flag'
							className='h-[80px] w-[180px]'
						/>

						<div className='flex flex-col justify-center'>
							<div className='font-extrabold text-lg uppercase md:text-xl'>
								{team.name}
							</div>
							<div className='font-extrabold text-xs md:text-sm'>
								{team.acronym}
							</div>
							<div>
								<span className='font-extrabold text-xs md:text-sm'>
									{t('timezone')}:
								</span>{' '}
								{team.timezone}
							</div>
						</div>
					</div>

					{isCaptain ? (
						<div className='flex gap-3'>
							<Button className='w-[180px]'>{t('Buttons.edit')}</Button>
							<form action={deleteTeam}>
								<input name='csrf_token' defaultValue={csrfToken} hidden />
								<input name='team_id' defaultValue={team.id} hidden />
								<input name='user_id' defaultValue={session.sub} hidden />
								<Button variant='outline' className='w-[180px]'>
									{t('Buttons.delete')}
								</Button>
							</form>
						</div>
					) : (
						<Button className='w-[180px]'>{t('Buttons.leave')}</Button>
					)}
				</section>
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

				{isCaptain && (
					<Search
						teamId={team.id}
						inviteButtonText={t('Invites.Invite.inviteButton')}
						placeholderText={t('Invites.Invite.placeholder')}
					/>
				)}
				<Suspense fallback={<SectionLoader className='h-[311px]' />}>
					<Invites teamId={team.id} isCaptain={isCaptain} />
				</Suspense>
			</section>
		</div>
	)
}
