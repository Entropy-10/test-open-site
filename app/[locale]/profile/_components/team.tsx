import { createClient } from '@supabase/server'
import dayjs from 'dayjs'
import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'
import Image from 'next/image'

import Button from '~/components/ui/button'

interface TeamProps {
	userId: string
}

export default async function Team({ userId }: TeamProps) {
	const t = await getTranslations('ProfilePage.Team')
	const supabase = createClient(cookies())
	const { data } = await supabase
		.from('players')
		.select('joined_at, teams(*)')
		.eq('user_id', userId)
		.maybeSingle()

	if (!data?.teams) {
		return (
			<div className='flex h-48 items-center justify-center text-center'>
				<p className='max-w-80 text-center'>{t('none')}</p>
			</div>
		)
	}

	const joinedDate = dayjs(data.joined_at).format('MMMM D, YYYY')
	const team = data.teams

	return (
		<div className='padding flex h-48 flex-col justify-center space-y-4'>
			<div className='flex items-center gap-4'>
				<Image
					className='h-[60px] w-[135px] md:h-[72px] md:w-[162px]'
					width={162}
					height={72}
					sizes='(min-width: 768px) 162px, 135px'
					src={team.flag}
					alt={`${team.flag}'s flag`}
				/>
				<div>
					<div className='font-extrabold text-lg md:text-xl'>{team.name}</div>
					<div className='font-medium text-medium-blue text-sm md:text-base'>
						<span className='font-extrabold'>{t('timezone')}:</span>{' '}
						{team.timezone}
					</div>
					<div className='font-medium text-medium-blue text-sm md:text-base'>
						<span className='font-extrabold'>{t('joined')}:</span> {joinedDate}
					</div>
				</div>
			</div>

			<Button
				className='w-[135px] md:w-[162px]'
				href='/team'
				variant='invertedOutline'
			>
				{t('manageTeamButton')}
			</Button>
		</div>
	)
}
