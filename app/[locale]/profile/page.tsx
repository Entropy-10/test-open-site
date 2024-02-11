import { getSession } from '@session'
import { createClient } from '@supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'

import { getTranslations } from 'next-intl/server'
import ErrorModal from '~/components/error-modal'
import SectionLoader from '~/components/section-loader'
import Background from '~/components/ui/Background'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import AvatarInfo from './_components/avatar-info'
import Invites from './_components/invites'
import Team from './_components/team'

export default async function ProfilePage() {
	const session = await getSession()
	if (!session) redirect('/unauthorized')

	const t = await getTranslations('ProfilePage')
	const buttonT = await getTranslations('Buttons')
	const supabase = createClient(cookies())

	const { data: user } = await supabase
		.from('users')
		.select('*')
		.eq('osu_id', session.sub)
		.maybeSingle()

	if (!user) notFound()

	return (
		<div>
			<ErrorModal text={buttonT('close')} />
			<Background className='py-8'>
				<Heading>{t('Headings.profile')}</Heading>
				<Divider />

				<section className='padding flex gap-6 md:gap-20'>
					<AvatarInfo user={user} type='osu'>
						<div className='space-y-1'>
							<div>
								<span className='font-extrabold'>{t('Osu.rank')}:</span> #
								{user.rank ? user.rank.toLocaleString() : 'No Rank'}
							</div>

							<div>
								<span className='font-extrabold'>{t('Osu.countryRank')}:</span>{' '}
								#
								{user.country_rank
									? user.country_rank.toLocaleString()
									: 'No Rank'}
							</div>
						</div>

						<div className='flex items-center gap-1'>
							<Image
								width={30}
								height={30}
								src={`https://flagsapi.com/${user.country_code}/flat/64.png`}
								alt={`${user.country} flag`}
							/>
							{user.country}
						</div>
					</AvatarInfo>

					<AvatarInfo user={user} type='discord' className='hidden xs:flex'>
						<div className='font-extrabold uppercase'>@{user.discord_tag}</div>
					</AvatarInfo>
				</section>
			</Background>

			<section className='py-8 text-light-blue'>
				<Heading>{t('Headings.team')}</Heading>
				<Divider className='bg-light-blue' />
				<Heading sub>{t('Team.heading')}</Heading>

				<Suspense fallback={<SectionLoader />}>
					<Team userId={session.sub} />
				</Suspense>

				<Divider variant='single' className='bg-light-blue' />
				<Heading id='invites' sub>
					{t('Invites.heading')}
				</Heading>

				<Suspense fallback={<SectionLoader className='h-[311px]' />}>
					<Invites userId={session.sub} />
				</Suspense>
			</section>
		</div>
	)
}
