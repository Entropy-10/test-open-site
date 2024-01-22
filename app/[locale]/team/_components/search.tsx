'use client'

import { useState } from 'react'
import Image from 'next/image'
import { createClient } from '@supabase/client'
import { SearchIcon, X } from 'lucide-react'

import { invite } from '../_actions/invite'
import StatusModal from './error-modal'
import InviteButton from './invite-button'

interface SearchProps {
  teamId: number
}

export default function Search({ teamId }: SearchProps) {
  const [debounce, setDebounce] = useState<NodeJS.Timeout>()
  const [results, setResults] = useState<UserResult[]>([])
  const [selectedUser, setSelectedUser] = useState<UserResult | null>(null)
  const supabase = createClient()

  function handleSearch(term: string | null) {
    if (debounce) clearTimeout(debounce)

    setDebounce(
      setTimeout(async () => {
        if (!term) return setResults([])

        const { data, error } = await supabase
          .from('users')
          .select('osu_id, osu_avatar, osu_name')
          .textSearch('osu_name', term, { type: 'websearch' })
          .limit(5)

        if (error) return console.error(error)
        setResults(data)
      }, 250)
    )
  }

  function handleSelect(result: UserResult) {
    setSelectedUser(result)
    setResults([])
  }

  return (
    <div className='padding pt-3'>
      <StatusModal />
      <form
        onSubmit={() => setSelectedUser(null)}
        action={invite}
        className='flex gap-3'
      >
        <InviteButton disabled={!selectedUser} />
        <input name='team_id' defaultValue={teamId} hidden />
        <input name='user_id' defaultValue={selectedUser?.osu_id} hidden />

        <div className='relative max-w-80 grow'>
          {selectedUser ? (
            <>
              <div className='flex h-[32px] w-full items-center gap-1 border-[1.5px] border-dark-blue px-1'>
                <Image
                  width={25}
                  height={25}
                  src={selectedUser.osu_avatar}
                  alt={`${selectedUser.osu_avatar}'s pfp`}
                  className='size-[25px]'
                />
                {selectedUser.osu_name}
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className='absolute right-1.5 top-[6px] focus:outline-none'
              >
                <X
                  size={20}
                  className=' stroke-dark-blue hover:stroke-red-400'
                />
              </button>
            </>
          ) : (
            <>
              <input
                onChange={e => handleSearch(e.currentTarget.value)}
                placeholder='Enter osu username...'
                className='h-[32px] w-full border-[1.5px] border-dark-blue pl-1.5 pr-[30px] text-dark-blue placeholder:text-dark-blue/55 focus:-outline-offset-2'
              />
              <SearchIcon
                size={20}
                className='absolute right-1.5 top-[5px] stroke-dark-blue'
              />
            </>
          )}

          {results.length > 0 && (
            <div className='absolute mt-1 w-full border-[1.5px] border-dark-blue bg-milky-white'>
              {results.map(result => (
                <button
                  onClick={() => handleSelect(result)}
                  key={result.osu_id}
                  className='flex w-full items-center gap-1 p-0.5 text-dark-blue hover:bg-light-blue/10 hover:text-light-blue focus:outline-none'
                >
                  <Image
                    width={25}
                    height={25}
                    src={result.osu_avatar}
                    alt={`${result.osu_avatar}'s pfp`}
                    className='size-[25px]'
                  />
                  {result.osu_name}
                </button>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

interface UserResult {
  osu_id: string
  osu_avatar: string
  osu_name: string
}
