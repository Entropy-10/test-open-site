import { getSession } from '@utils/server'
import { getTranslations } from 'next-intl/server'
import { navItems } from '@siteConfig'

import Link from '~/components/ui/Link'
import NavItem from '~/components/ui/NavItem'
import Logo from '~/components/icons/logo'
import SignInButton from '~/components/sign-in-button'
import UserDropdown from './user-dropdown'

export default async function Header() {
  const t = await getTranslations('NavItems')
  const session = getSession()

  return (
    <header className='disabledViewTransiton h-14 bg-milky-white'>
      <section className='padding flex h-full grow items-center justify-between'>
        <Link href='/' className='flex cursor-pointer items-center space-x-2'>
          <Logo h={38} w={44} className='h-[38px] w-[44px]' />
          <h1 className='text-xl'>
            <span className='font-black'>TEST</span> OPEN
          </h1>
        </Link>

        <nav className='hidden h-full space-x-8 px-4 text-center text-xs font-semibold md:flex'>
          {navItems.map(({ link, text }) => (
            <NavItem
              key={text}
              link={link}
              className='flex items-center justify-center'
              underline
            >
              {t(text)}
            </NavItem>
          ))}
        </nav>

        {session ? (
          <UserDropdown session={session} />
        ) : (
          <SignInButton className='hidden md:flex' />
        )}
      </section>
    </header>
  )
}
