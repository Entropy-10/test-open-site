import { createClient } from '@supabase/server'
import { cookies } from 'next/headers'

import { getTranslations } from 'next-intl/server'
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
		<div className='padding my-5 flex w-full gap-5'>
			{players.map(player => (
				<Player
					key={player.user_id}
					player={player}
					userId={userId}
					isCaptain={isCaptain}
				/>
			))}
		</div>
	)
}
