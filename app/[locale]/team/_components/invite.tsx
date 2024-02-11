import dayjs from 'dayjs'
import Image from 'next/image'

import { deleteItem } from '../_actions/delete'
import DeleteButton from './delete-button'

import { useTranslations } from 'next-intl'
import { headers } from 'next/headers'
import { CsrfInput } from '~/components/csrf-input'
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
	const t = useTranslations('TeamPage.Invites.Invite')
	const user = invite.users
	let statusColor: string

	switch (invite.status) {
		case 'pending':
			statusColor = '#faca47'
			break
		case 'accepted':
			statusColor = '#4eea7b'
			break
		case 'denied':
			statusColor = '#ff716c'
			break
	}

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
				<div className='flex flex-col items-center font-extrabold text-lg/4 text-milky-white md:text-xl'>
					{user.osu_name}
					<div
						style={{ color: statusColor }}
						className='text-center font-medium text-sm/3 italic'
					>
						{invite.status}
					</div>
				</div>
			</div>

			<div className='mb-4 text-dark-blue text-xs md:mb-8 md:text-sm'>
				<div>
					<span className='font-extrabold'>{t('rank')}:</span> #
					{user.rank?.toLocaleString()}
				</div>
				<div>
					<span className='font-extrabold'>{t('discord')}:</span> @
					{user.discord_tag}
				</div>
				<div>
					<span className='font-extrabold'>{t('sent')}:</span>{' '}
					{dayjs(invite.created_at).format('MMMM D, YYYY')}
				</div>
			</div>

			{isCaptain && (
				<form action={deleteItem}>
					<CsrfInput token={csrfToken} />
					<input name='id' defaultValue={invite.id} hidden />
					<input name='type' defaultValue='invite' hidden />
					<DeleteButton text={t('deleteButton')} />
				</form>
			)}
		</div>
	)
}
