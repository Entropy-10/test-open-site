'use client'

import Image from 'next/image'
import { Link } from '@navigation'

import { signOut } from '~/lib/actions'
import * as Dropdown from '~/components/ui/dropdown'
import ChevronDown from '~/components/icons/chevron-down'

import type { Session } from '@types'

interface UserDropdownProps {
  session: Session
}

export default function UserDropdown({ session }: UserDropdownProps) {
  return (
    <Dropdown.Root>
      {/* eslint-disable-next-line tailwindcss/no-contradicting-classname */}
      <Dropdown.Trigger className='group flex max-w-44 items-center justify-between bg-gradient-to-r from-light-blue from-[-100%] to-salmon px-1 py-0.5 text-milky-white'>
        <div className='flex items-center'>
          <Image
            width={26}
            height={26}
            alt='pfp'
            src={session.osu_avatar}
            className='size-[26px]'
          />
          <span className='mx-1 hidden max-w-28 truncate text-left text-sm font-semibold md:block'>
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
          <Link href='/profile#invites'>INVITES</Link>
        </Dropdown.Item>

        <Dropdown.Item asChild>
          <Link href='/team'>TEAM</Link>
        </Dropdown.Item>

        <Dropdown.Item asChild className='data-[highlighted]:bg-red-400'>
          <button className='text-left text-red-400' onClick={() => signOut()}>
            SIGN OUT
          </button>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
