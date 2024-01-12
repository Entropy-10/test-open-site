import Image from 'next/image'
import { Star } from 'lucide-react'

import Button from '~/components/ui/Button'

import type { Tables } from '~/types/supabase'

interface PlayerProps {
  player: Tables<'players'> & { users: Tables<'users'> | null }
}

export default function Player({ player }: PlayerProps) {
  if (!player.users) return null
  const user = player.users
  const isCaptain = player.role === 'captain'

  return (
    <div className='w-[200px] bg-gradient-to-r from-light-blue to-salmon p-4 md:w-[250px]'>
      <div className='mb-1.5 flex flex-col items-center uppercase md:mb-3'>
        <Image
          height={115}
          width={115}
          src={user.osu_avatar}
          alt='osu pfp'
          sizes='(min-width: 768px) 115px, 90px'
          className='size-[90px] md:size-[115px]'
        />
        <div className='flex items-center gap-1 text-lg font-extrabold text-milky-white md:text-xl'>
          {isCaptain && <Star size={18} className='fill-milky-white' />}
          {user.osu_name}
        </div>
      </div>

      <div className='mb-4 text-xs text-dark-blue md:mb-8 md:text-sm'>
        <div>
          <span className='font-extrabold'>RANK:</span> #
          {user.rank?.toLocaleString()}
        </div>
        <div>
          <span className='font-extrabold'>DISCORD:</span> @{user.discord_tag}
        </div>
      </div>

      {isCaptain && <Button className='w-full'>REMOVE PLAYER</Button>}
    </div>
  )
}
