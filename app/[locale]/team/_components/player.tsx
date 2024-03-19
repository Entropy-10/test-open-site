import { Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { cn } from '@utils/client'
import type { Tables } from '~/types/supabase'

interface PlayerProps {
	userId: string
	isCaptain: boolean
	player: Tables<'players'> & { users: Tables<'users'> | null }
}

export default function Player({ player, userId, isCaptain }: PlayerProps) {
	if (!player.users) return null
	const user = player.users
	const t = useTranslations('TeamPage.Players.Player')

	return (
		<div
			className={cn(
				'h-full w-[200px] bg-gradient-to-r from-light-blue to-salmon p-4 md:w-[250px]'
			)}
		>
			<div className='mb-1.5 flex flex-col items-center uppercase md:mb-3'>
				<Image
					height={115}
					width={115}
					src={user.osu_avatar}
					alt='osu pfp'
					sizes='(min-width: 768px) 115px, 90px'
					className='size-[90px] select-none md:size-[115px]'
				/>
				<div className='flex items-center gap-1 font-extrabold text-lg text-milky-white md:text-xl'>
					{player.role === 'captain' && (
						<Star size={18} className='fill-milky-white' />
					)}
					{user.osu_name}
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
			</div>

			{/* {userId !== player.user_id && isCaptain ? (
				<form action={deleteItem}>
					<CsrfInput token={csrfToken} />
					<input name='id' defaultValue={player.user_id} hidden />
					<input name='type' defaultValue='player' hidden />
					<DeleteButton text={t('removeButton')} />
				</form>
			) : null} */}
		</div>
	)
}
