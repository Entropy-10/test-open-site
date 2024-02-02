import { navItems } from '@siteConfig'
import type { Session } from '@types'
import { Menu } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import SignInButton from '~/components/sign-in-button'
import SignOutButton from '~/components/sign-out-button'
import * as Dropdown from '~/components/ui/dropdown'
import NavItem from '~/components/ui/nav-item'

interface MobileNavProps {
	session: Session | null
	inviteCount: number | null
}

export default async function MobileNav({
	session,
	inviteCount
}: MobileNavProps) {
	const t = await getTranslations('NavItems')

	return (
		<Dropdown.Root>
			<Dropdown.Trigger className='relative flex items-center justify-between gap-1 bg-gradient-to-r from-[-100%] from-light-blue to-salmon px-1 py-0.5 text-milky-white focus:outline-none'>
				{inviteCount ? (
					<div className='-left-1 -top-1 absolute'>
						<div className='relative'>
							<div className='size-3 rounded-full bg-red-500' />
							<div className='absolute top-[1px] left-[1px] size-[10px] animate-ping rounded-full bg-red-500' />
						</div>
					</div>
				) : null}

				{session && (
					<Image
						width={26}
						height={26}
						alt='pfp'
						src={session.osu_avatar}
						className='size-[26px]'
					/>
				)}

				<Menu />
			</Dropdown.Trigger>

			<Dropdown.Content>
				{navItems.map(({ link, text }) => (
					<Dropdown.Item className='p-0'>
						<NavItem
							key={text}
							link={link}
							className='h-full w-full px-3 py-0.5 hover:bg-light-blue hover:text-milky-white'
							activeClassName='bg-light-blue text-milky-white'
						>
							{t(text)}
						</NavItem>
					</Dropdown.Item>
				))}

				<div className='px-2 py-0.5'>
					<div className='h-px w-full bg-light-blue' />
				</div>

				{session ? (
					<>
						<Dropdown.Item className='p-0'>
							<NavItem
								link='/profile'
								activeClassName='bg-light-blue text-milky-white'
								className='h-full w-full px-3 py-0.5 hover:bg-light-blue hover:text-milky-white'
							>
								PROFILE
							</NavItem>
						</Dropdown.Item>

						<Dropdown.Item className='p-0'>
							<NavItem
								link='/profile#invites'
								activeClassName='bg-light-blue text-milky-white'
								className='flex h-full w-full items-center justify-between px-3 py-0.5 hover:bg-light-blue hover:text-milky-white'
							>
								INVITES
								{inviteCount ? (
									<div className='flex size-4 items-center justify-center rounded-full bg-red-500 font-bold text-milky-white text-xs'>
										{inviteCount}
									</div>
								) : null}
							</NavItem>
						</Dropdown.Item>

						<Dropdown.Item className='p-0'>
							<NavItem
								link='/team'
								activeClassName='bg-light-blue text-milky-white'
								className='h-full w-full px-3 py-0.5 hover:bg-light-blue hover:text-milky-white'
							>
								TEAM
							</NavItem>
						</Dropdown.Item>

						<Dropdown.Item className='p-0 data-[highlighted]:bg-red-400'>
							<SignOutButton className='h-full w-full px-3 py-0.5 hover:text-milky-white' />
						</Dropdown.Item>
					</>
				) : (
					<div className='px-2 pt-0.5 pb-1'>
						<SignInButton className='h-6 w-full' />
					</div>
				)}
			</Dropdown.Content>
		</Dropdown.Root>
	)
}
