import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { links, navItems } from '@siteConfig'
import { cn } from '@utils'

import Button from '~/components/ui/Button'
import Link from '~/components/ui/Link'
import NavItem from '~/components/ui/NavItem'
import DiscordIcon from '~/components/icons/DiscordIcon'
import SpotifyIcon from '~/components/icons/SpotifyIcon'
import TwitchIcon from '~/components/icons/TwitchIcon'
import XIcon from '~/components/icons/XIcon'
import YoutubeIcon from '~/components/icons/YoutubeIcon'
import whiteLogo from '../../../public/images/logo-white.png'
import Status from './status'

export default function Footer() {
  const buttonsT = useTranslations('Buttons')
  const navT = useTranslations('NavItems')
  const t = useTranslations('Footer')
  const { discord, x, twitch, spotify, youtube } = links.socials

  return (
    <footer className='disabledViewTransiton relative flex h-64 flex-col bg-footer py-4 text-milky-white'>
      <div className='padding mt-4 flex flex-col space-y-5 md:space-y-0'>
        <div className='hidden md:mb-5 md:flex'>
          <Link href='/' className='cursor-pointer'>
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
            <nav className='flex select-none justify-between divide-x-2 text-xs font-medium'>
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

          <div className='mt-5 flex items-center space-x-5 *:cursor-pointer max-md:mt-0 md:justify-end'>
            <Link target='_blank' href={discord}>
              <DiscordIcon className='hover:fill-[#5865F2]' />
            </Link>
            <Link target='_blank' href={x}>
              <XIcon className='hover:fill-[#000000]' />
            </Link>
            <Link target='_blank' href={twitch}>
              <TwitchIcon className='hover:fill-[#9146FF]' />
            </Link>
            <Link target='_blank' href={youtube}>
              <YoutubeIcon className='hover:fill-[#FF0000]' />
            </Link>
            <Link target='_blank' href={spotify}>
              <SpotifyIcon className='hover:fill-[#1DB954]' />
            </Link>
          </div>
        </div>

        <div className='z-20 flex justify-center md:absolute md:bottom-1 md:right-[48px] md:-mr-2 md:justify-end lg:right-[96px]'>
          <Status />
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
