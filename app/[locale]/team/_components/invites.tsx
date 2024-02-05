import { createClient } from '@supabase/server'
import { cookies } from 'next/headers'

import { getTranslations } from 'next-intl/server'
import Invite from './invite'

interface InvitesProps {
	teamId: number
	isCaptain: boolean
}

export default async function Invites({ teamId, isCaptain }: InvitesProps) {
	const t = await getTranslations('TeamPage.Invites')
	const supabase = createClient(cookies())
	const { data: invites, error } = await supabase
		.from('invites')
		.select('*, users(osu_avatar, osu_name, rank, discord_tag)')
		.eq('team_id', teamId)

	if (error) console.log(error)
	if (!invites || invites.length === 0) {
		return (
			<div className='flex h-[311px] items-center justify-center'>
				<p className='max-w-96 text-center'>{t('none')}</p>
			</div>
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
