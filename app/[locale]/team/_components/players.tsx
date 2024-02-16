import { createClient } from '@supabase/server'
import { cookies } from 'next/headers'

import { getTranslations } from 'next-intl/server'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '~/components/carousel'
import Player from './player'

interface PlayersProps {
	teamId: number
	userId: string
	isCaptain: boolean
}

export default async function Players({
	teamId,
	userId,
	isCaptain
}: PlayersProps) {
	const t = await getTranslations('TeamPage.Invites')
	const supabase = createClient(cookies())
	const { data: players } = await supabase
		.from('players')
		.select('*, users(*)')
		.eq('team_id', teamId)
		.order('role')

	if (!players?.[0]) {
		return (
			<div className='flex h-[311px] items-center justify-center'>
				{t('error')}
			</div>
		)
	}

	return (
		<div className='padding my-5 flex w-full justify-center gap-5'>
			<Carousel className='w-full'>
				<CarouselContent className='-ml-4'>
					{players.map(player => (
						<CarouselItem
							key={player.user_id}
							className='ml-4 basis-[200px] md:basis-[250px]'
						>
							<Player player={player} userId={userId} isCaptain={isCaptain} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}
