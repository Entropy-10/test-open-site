import Image from 'next/image'

import { cn } from '@utils/client'

import type { Tables } from '~/types/supabase'

interface LobbyProps {
	lobby: Tables<'lobbies'> & { teams: Tables<'teams'>[] }
	className?: string
}

export default function Lobby({ lobby }: LobbyProps) {
	return (
		<div
			className={cn(
				'w-[300px] p-3 text-light-blue shadow-[0px_4px_15px_0px_rgba(94,114,235,0.45)]',
				lobby.id > 12 &&
					'text-[#FF9190] shadow-[0px_4px_15px_0px_rgba(255,145,144,0.45)]',
				lobby.lobby_id?.startsWith('EX') &&
					'text-lavender shadow-[0px_4px_15px_0px_rgba(128,126,225,0.45)]'
			)}
		>
			<div className='flex items-center gap-3'>
				<div className='font-extrabold text-5xl'>
					{lobby.lobby_id ?? lobby.id}
				</div>

				<div>
					<div className='font-extrabold font-sm'>
						{lobby.date} | {lobby.time}
					</div>
					<div className='text-xs'>
						<span className='font-extrabold'>REFEREE: </span>
						{lobby.referee}
					</div>
				</div>
			</div>

			<div className='mt-2 flex flex-col gap-2'>
				{lobby.teams?.map(team => (
					<div
						key={team.name}
						className='flex items-center gap-2 font-extrabold'
					>
						<Image width={65} height={30} src={team.flag} alt='team flag' />
						<div>{team.name}</div>
					</div>
				))}

				{Array.from({ length: 3 - lobby.teams?.length }).map((_, index) => (
					<div
						key={index}
						className={cn(
							'h-[30px] w-[65px] bg-light-blue/45',
							lobby.id > 12 && 'bg-[#FF9190]/45',
							lobby.lobby_id?.startsWith('EX') && 'bg-lavender/45'
						)}
					/>
				))}
			</div>
		</div>
	)
}
