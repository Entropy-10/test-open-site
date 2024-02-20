import { links, navItems } from '@siteConfig'
import { cn } from '@utils/client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import NextLink from 'next/link'
import { Suspense } from 'react'
import Challonge from '~/components/icons/challonge'
import Discord from '~/components/icons/discord'
import Osu from '~/components/icons/osu'
import OsuBg from '~/components/icons/osu-bg'
import Twitch from '~/components/icons/twitch'
import X from '~/components/icons/x'
import Youtube from '~/components/icons/youtube'
import Button from '~/components/ui/Button'
import Link from '~/components/ui/Link'
import NavItem from '~/components/ui/nav-item'
import whiteLogo from '../../../public/images/logo-white.png'
import Status from './status'

export default function Footer() {
	const buttonsT = useTranslations('Buttons')
	const navT = useTranslations('NavItems')
	const t = useTranslations('Footer')
	const { discord, x, twitch, youtube } = links.socials

	return (
		<footer className='relative flex h-64 flex-col bg-footer py-4 text-milky-white'>
			<div className='padding mt-4 flex flex-col space-y-5 md:space-y-0'>
				<div className='hidden md:mb-5 md:flex'>
					<Link href='/' className='cursor-pointer focus:outline-none'>
						<h4 className='text-xl lg:text-2xl'>
							<span className='font-extrabold'>TEST</span> OPEN
						</h4>
					</Link>
				</div>

				<div className='flex justify-center md:justify-between'>
					<p className='hidden max-w-[300px] text-xs md:block'>
						{t('description')}
					</p>

					<div className='max-md:w-full max-md:max-w-lg'>
						<nav className='flex select-none justify-between divide-x-2 font-medium text-xs'>
							{navItems.map((item, i) => (
								<NavItem
									key={item.text}
									link={item.link}
									className={cn(
										'flex grow justify-center hover:text-medium-blue',
										navItems.length === i + 1 ? 'md:pl-3' : 'md:px-3'
									)}
									activeClassName='text-medium-blue'
								>
									{navT(item.text)}
								</NavItem>
							))}
						</nav>
					</div>
				</div>

				<div className='order-first flex grow items-center justify-center md:order-none md:justify-between'>
					<Button href='/register' className='hidden md:flex'>
						{buttonsT('register')}
					</Button>

					<div className='mt-5 flex items-center space-x-5 max-md:mt-0 *:cursor-pointer md:justify-end *:outline-none'>
						<NextLink target='_blank' href={discord}>
							<Discord className='hover:fill-[#5865F2]' />
						</NextLink>
						<NextLink target='_blank' href={x}>
							<X className='hover:fill-[#000000]' />
						</NextLink>
						<NextLink target='_blank' href={twitch}>
							<Twitch className='hover:fill-[#9146FF]' />
						</NextLink>
						<NextLink target='_blank' href={youtube}>
							<Youtube className='hover:fill-[#FF0000]' />
						</NextLink>
						<NextLink
							className='group relative h-[30px] w-[30px]'
							target='_blank'
							href={links.forumPost}
						>
							<Osu className='absolute z-10' />
							<OsuBg className='absolute top-0 left-0 opacity-0 group-hover:opacity-100' />
						</NextLink>
						<NextLink target='_blank' href={links.challonge}>
							<Challonge className='hover:fill-[#FF7324]' />
						</NextLink>
					</div>
				</div>

				<div className='md:-mr-2 z-20 flex justify-center md:absolute lg:right-[96px] md:right-[48px] md:bottom-1 md:justify-end'>
					<Suspense>
						<Status />
					</Suspense>
				</div>
			</div>

			<div className='absolute bottom-4 flex w-full select-none items-center justify-center'>
				<div className='h-[3px] w-full bg-milky-white' />
				<Image src={whiteLogo} alt='logo' width={50} height={50} />
				<div className='h-[3px] w-full bg-milky-white' />
			</div>
		</footer>
	)
}
