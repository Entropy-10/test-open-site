'use client'

import { Link } from '@navigation'
import Image from 'next/image'

import ChevronDown from '~/components/icons/chevron-down'
import * as Dropdown from '~/components/ui/dropdown'
import { signOut } from '~/lib/actions'

import type { Session } from '@types'

interface UserDropdownProps {
	session: Session
	inviteCount: number | null
}

export default function UserDropdown({
	session,
	inviteCount
}: UserDropdownProps) {
	return (
		<Dropdown.Root>
			{/* eslint-disable-next-line tailwindcss/no-contradicting-classname */}
			<Dropdown.Trigger className='group relative flex max-w-44 items-center justify-between bg-gradient-to-r from-[-100%] from-light-blue to-salmon px-1 py-0.5 text-milky-white'>
				{inviteCount ? (
					<div className='-left-1 -top-1 absolute'>
						<div className='relative'>
							<div className='size-3 rounded-full bg-red-500' />
							<div className='absolute top-[1px] left-[1px] size-[10px] animate-ping rounded-full bg-red-500' />
						</div>
					</div>
				) : null}

				<div className='flex items-center'>
					<Image
						width={26}
						height={26}
						alt='pfp'
						src={session.osu_avatar}
						className='size-[26px]'
					/>
					<span className='mx-1 hidden max-w-28 truncate text-left font-semibold text-sm md:block'>
						{session.osu_name}
					</span>
				</div>

				<ChevronDown className='size-6 transition-all duration-300 group-data-[state=open]:rotate-180' />
			</Dropdown.Trigger>

			<Dropdown.Content>
				<Dropdown.Item asChild>
					<Link href='/profile'>PROFILE</Link>
				</Dropdown.Item>

				<Dropdown.Item asChild>
					<Link
						className='flex items-center justify-between'
						href='/profile#invites'
					>
						INVITES
						{inviteCount ? (
							<div className='flex size-4 items-center justify-center rounded-full bg-red-500 font-bold text-milky-white text-xs'>
								{inviteCount}
							</div>
						) : null}
					</Link>
				</Dropdown.Item>

				<Dropdown.Item asChild>
					<Link href='/team'>TEAM</Link>
				</Dropdown.Item>

				<Dropdown.Item asChild className='data-[highlighted]:bg-red-400'>
					<button
						className='text-left text-red-400'
						type='button'
						onClick={() => signOut()}
					>
						SIGN OUT
					</button>
				</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown.Root>
	)
}
