import { createClient } from '@supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'

export default async function TeamList() {
	const supabase = createClient(cookies())
	const { data: teams } = await supabase
		.from('teams')
		.select('*, players(role, users(osu_avatar, osu_name, rank))')
		.order('role', { referencedTable: 'players' })

	if (!teams) return null

	return (
		<div className='padding flex flex-wrap justify-center gap-5 py-8'>
			{teams.map(team => (
				<div
					key={team.id}
					className='relative h-[190px] w-[500px] bg-milky-white text-light-blue shadow-[0px_4px_15px_0px_rgba(94,114,235,0.45)]'
				>
					<div className='flex'>
						<div className='relative h-[140px] w-[315px]'>
							<Image
								width={315}
								height={140}
								src={team.flag}
								alt={`${team.name}'s flag`}
								className='h-[140px] w-[315px] select-none'
							/>
							<div className='absolute top-0 z-10 size-full bg-flag-fade' />
						</div>

						<div className='flex flex-col gap-1 py-1.5'>
							{team.players.map(({ users: user }) => (
								<div key={user?.osu_name} className='flex gap-2'>
									<Image
										height={32}
										width={32}
										src={user?.osu_avatar ?? ''}
										alt={`${user?.osu_name}'s pfp`}
										className='size-[32px]'
									/>

									<div className='flex flex-col justify-center'>
										<div className='font-extrabold text-sm/3'>
											{user?.osu_name}
										</div>
										<div className='text-xs'>
											#{user?.rank?.toLocaleString()}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className='absolute bottom-1.5 z-20 w-[315px] pr-4 pl-1.5'>
						<div className='font-extrabold text-xl/5'>{team.name}</div>
						<div className='flex justify-between'>
							<div>{team.acronym}</div>
							<div>{team.timezone}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
