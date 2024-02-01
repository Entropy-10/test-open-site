import dayjs from 'dayjs'
import Image from 'next/image'

import { deleteInvite } from '../_actions/delete-invite'
import DeleteButton from './delete-button'

import { headers } from 'next/headers'
import type { Tables } from '~/types/supabase'

interface InviteProps {
	isCaptain: boolean
	invite: Tables<'invites'> & {
		users: {
			osu_name: string
			osu_avatar: string
			rank: number | null
			discord_tag: string | null
		} | null
	}
}

export default function Invite({ invite, isCaptain }: InviteProps) {
	if (!invite.users) return null
	const csrfToken = headers().get('X-CSRF-Token') ?? 'missing'
	const user = invite.users

	return (
		<div className='w-[200px] bg-gradient-to-r from-light-blue to-lavender p-4 md:w-[250px]'>
			<div className='mb-1.5 flex flex-col items-center uppercase md:mb-3'>
				<Image
					height={115}
					width={115}
					src={user.osu_avatar}
					alt={`${user.osu_name}'s' pfp`}
					sizes='(min-width: 768px) 115px, 90px'
					className='size-[90px] md:size-[115px]'
				/>
				<div className='flex flex-col font-extrabold text-lg/4 text-milky-white md:text-xl'>
					{user.osu_name}
					<div className='font-medium text-[#f7cb73] text-sm/3 italic'>
						{invite.status}
					</div>
				</div>
			</div>

			<div className='mb-4 text-dark-blue text-xs md:mb-8 md:text-sm'>
				<div>
					<span className='font-extrabold'>RANK:</span> #
					{user.rank?.toLocaleString()}
				</div>
				<div>
					<span className='font-extrabold'>DISCORD:</span> @{user.discord_tag}
				</div>
				<div>
					<span className='font-extrabold'>SENT:</span>{' '}
					{dayjs(invite.created_at).format('MMMM D, YYYY')}
				</div>
			</div>

			{isCaptain && (
				<form action={deleteInvite}>
					<input name='csrf_token' defaultValue={csrfToken} hidden />
					<input name='invite_id' defaultValue={invite.id} hidden />
					<DeleteButton />
				</form>
			)}
		</div>
	)
}