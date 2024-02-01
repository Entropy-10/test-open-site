import { cn } from '@utils/client'
import Image from 'next/image'

import Button from '~/components/ui/Button'
import { relink } from '../_actions/relink'
import { update } from '../_actions/update'
import UpdateButton from './update-button'

import { headers } from 'next/headers'
import type { Tables } from '~/types/supabase'

interface AvatarInfoProps {
	user: Tables<'users'>
	type: 'osu' | 'discord'
	children?: React.ReactNode
	className?: string
}

export default function AvatarInfo({
	user,
	type,
	children,
	className
}: AvatarInfoProps) {
	const pathname = headers().get('x-pathname') ?? '/profile'
	const csrfToken = headers().get('X-CSRF-Token') ?? 'missing'

	return (
		<div className={cn('flex gap-2', className)}>
			<div>
				<Image
					width={123}
					height={123}
					sizes='(min-width: 768px) 123px, 96px'
					src={type === 'osu' ? user.osu_avatar : user.discord_avatar ?? ''}
					alt='osu pfp'
					className='mb-4 size-24 border-2 border-milky-white md:size-[123px]'
				/>
				<form action={type === 'discord' ? relink : update}>
					<input name='csrf_token' defaultValue={csrfToken} hidden />
					<input name='pathname' defaultValue={pathname} hidden />
					{type === 'osu' ? (
						<UpdateButton />
					) : (
						<Button className='w-24 md:w-[123px]'>RELINK</Button>
					)}
				</form>
			</div>

			<div className='flex h-24 flex-col justify-between text-sm md:h-[123px]'>
				<div className='font-extrabold text-lg uppercase md:mb-1 md:text-xl'>
					{type === 'osu' ? user.osu_name : user.discord_name}
				</div>

				<div className='flex h-[123px] flex-col justify-between text-xs md:text-sm'>
					{children}
				</div>
			</div>
		</div>
	)
}
