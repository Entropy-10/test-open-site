import { cookies } from 'next/headers'
import Image from 'next/image'
import { createClient } from '@supabase/server'
import dayjs from 'dayjs'

import Button from '~/components/ui/Button'

interface TeamProps {
  userId: string
}

export default async function Team({ userId }: TeamProps) {
  const supabase = createClient(cookies())
  const { data } = await supabase
    .from('players')
    .select('joined_at, teams(*)')
    .eq('user_id', userId)
    .maybeSingle()

  if (!data?.teams) {
    return (
      <div className='h-48'>
        <p className='flex h-full items-center justify-center text-center'>
          You currently do not have a team. <br />
          Join one by accepting any pending invites.
        </p>
      </div>
    )
  }

  const joinedDate = dayjs(data.joined_at).format('MMMM D, YYYY')
  const team = data.teams

  return (
    <div className='padding flex h-48 flex-col justify-center space-y-4'>
      <div className='flex items-center gap-4'>
        <Image
          className='h-[60px] w-[135px] md:h-[72px] md:w-[162px]'
          width={162}
          height={72}
          sizes='(min-width: 768px) 162px, 135px'
          src={team.flag}
          alt='team flag'
        />
        <div>
          <div className='text-lg font-extrabold md:text-xl'>{team.name}</div>
          <div className='text-sm font-medium text-medium-blue md:text-base'>
            <span className='font-extrabold'>TIMEZONE:</span> {team.timezone}
          </div>
          <div className='text-sm font-medium text-medium-blue md:text-base'>
            <span className='font-extrabold'>JOINED:</span> {joinedDate}
          </div>
        </div>
      </div>

      <Button className='w-[162px]' href='/team' variant='invertedOutline'>
        MANAGE MY TEAM
      </Button>
    </div>
  )
}
