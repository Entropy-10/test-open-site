import { createMetadata } from '@metadata'
import { createClient } from '@supabase/server'
import { getSession } from '@utils/server'
import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

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
	const session = getSession()
	if (!session) redirect('/unauthorized')

	const supabase = createClient(cookies())
	const { data, error } = await supabase
		.from('players')
		.select('role, teams(*)')
		.eq('user_id', session.sub)
		.maybeSingle()

	console.log(error)

	if (!data?.teams) return null

	const team = data.teams
	const isCaptain = data.role === 'captain'

	return (
		<div>
			<Background className='py-8'>
				<Heading>MY TEAM</Heading>
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
							<div className='text-lg font-extrabold uppercase md:text-xl'>
								{team.name}
							</div>
							<div className='text-xs font-extrabold md:text-sm'>
								{team.acronym}
							</div>
							<div>
								<span className='text-xs font-extrabold md:text-sm'>
									TIMEZONE:
								</span>{' '}
								{team.timezone}
							</div>
						</div>
					</div>

					{isCaptain ? (
						<div className='flex gap-3'>
							<Button className='w-[180px]'>EDIT TEAM</Button>
							<form action={deleteTeam}>
								<input name='team_id' defaultValue={team.id} hidden />
								<input name='user_id' defaultValue={session.sub} hidden />
								<Button variant='outline' className='w-[180px]'>
									DELETE TEAM
								</Button>
							</form>
						</div>
					) : (
						<Button className='w-[180px]'>LEAVE TEAM</Button>
					)}
				</section>
			</Background>

			<section className='py-8 text-light-blue'>
				<Heading>PLAYER LIST</Heading>
				<Divider className='bg-light-blue' />
				<Heading sub>CURRENT MEMBERS</Heading>

				<Suspense fallback={<SectionLoader className='h-[311px]' />}>
					<Players
						teamId={team.id}
						userId={session.sub}
						isCaptain={isCaptain}
					/>
				</Suspense>

				<Divider variant='single' className='bg-light-blue' />
				<Heading sub>OUTGOING INVITES</Heading>

				{isCaptain && <Search teamId={team.id} />}
				<Suspense fallback={<SectionLoader className='h-[311px]' />}>
					<Invites teamId={team.id} isCaptain={isCaptain} />
				</Suspense>
			</section>
		</div>
	)
}
