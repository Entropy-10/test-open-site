import { createClient } from '@supabase/server'
import { cookies } from 'next/headers'

import Invite from './invite'

interface InvitesProps {
	teamId: number
	isCaptain: boolean
}

export default async function Invites({ teamId, isCaptain }: InvitesProps) {
	const supabase = createClient(cookies())
	const { data: invites, error } = await supabase
		.from('invites')
		.select('*, users(osu_avatar, osu_name, rank, discord_tag)')
		.eq('team_id', teamId)

	if (error) console.log(error)
	if (!invites || invites.length === 0) {
		return (
			<p className='flex h-[311px] items-center justify-center text-center'>
				You currently do not have any outgoing invites. <br />
				Start by using the invite players box above.
			</p>
		)
	}

	return (
		<div className='padding my-5 flex w-full gap-5'>
			{invites.map(invite => (
				<Invite key={invite.id} invite={invite} isCaptain={isCaptain} />
			))}
		</div>
	)
}
