import { getSession } from '@session'
import { navItems } from '@siteConfig'
import { createClient } from '@supabase/server'
import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'

import { Link } from '@navigation'
import { Suspense } from 'react'
import Logo from '~/components/icons/logo'
import SignInButton from '~/components/sign-in-button'
import NavItem from '~/components/ui/nav-item'
import LanguageWrapper from './language-wrapper'
import MobileNav from './mobile-nav'
import UserDropdown from './user-dropdown'

export default async function Header() {
	const t = await getTranslations('NavItems')
	const session = await getSession()
	const supabase = createClient(cookies())
	let inviteCount: number | null = null

	if (session) {
		const { count } = await supabase
			.from('invites')
			.select('', { count: 'exact' })
			.eq('user_id', session?.sub)
			.eq('status', 'pending')
		inviteCount = count
	}

	return (
		<header className='disabledViewTransition h-14 bg-milky-white'>
			<section className='padding flex h-full grow items-center justify-between'>
				<Link
					href='/'
					className='flex cursor-pointer items-center space-x-2 focus:outline-none'
				>
					<Logo h={38} w={44} className='h-[38px] w-[44px]' />
					<h1 className='text-xl'>
						<span className='font-black'>TEST</span> OPEN
					</h1>
				</Link>

				<nav className='hidden h-full gap-4 px-4 text-center font-semibold text-xs md:flex min-[925px]:gap-8'>
					{navItems.map(({ link, text }) => (
						<NavItem
							key={text}
							link={link}
							className='flex items-center justify-center hover:text-light-blue'
							underline
						>
							{t(text)}
						</NavItem>
					))}
				</nav>

				<div className='flex gap-3'>
					<Suspense fallback={<div className='w-12' />}>
						<LanguageWrapper />
					</Suspense>

					<MobileNav user={session?.user} inviteCount={inviteCount} />

					{session?.user ? (
						<UserDropdown user={session.user} inviteCount={inviteCount} />
					) : (
						<div className='hidden md:flex'>
							<SignInButton />
						</div>
					)}
				</div>
			</section>
		</header>
	)
}
