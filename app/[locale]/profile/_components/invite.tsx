import Image from 'next/image'
import dayjs from 'dayjs'

import Button from '~/components/ui/Button'
import { acceptInvite } from '../_actions/accept-invite'
import { denyInvite } from '../_actions/deny-invite'

import type { Tables } from '~/types/supabase'

interface InviteProps {
  invite: Tables<'invites'> & {
    teams: {
      id: number
      flag: string
      name: string
      timezone: string
    } | null
  }
}

export default function Invite({ invite }: InviteProps) {
  if (!invite.teams) return null
  const team = invite.teams

  return (
    <div className='w-[200px] bg-gradient-to-r from-light-blue to-lavender p-4 md:w-[250px]'>
      <div className='mb-1.5 flex flex-col items-center uppercase md:mb-3'>
        <Image
          className='h-[60px] w-[135px] md:h-[72px] md:w-[162px]'
          width={162}
          height={72}
          sizes='(min-width: 768px) 162px, 135px'
          src={team.flag}
          alt={`${team.flag}'s flag`}
        />
        <div className='text-lg font-extrabold text-milky-white md:text-xl'>
          {team.name}
        </div>
      </div>

      <div className='mb-4 text-xs text-dark-blue md:mb-8 md:text-sm'>
        <div>
          <span className='font-extrabold'>TIMEZONE:</span> {team.timezone}
        </div>
        <div>
          <span className='font-extrabold'>INVITED:</span>{' '}
          {dayjs(invite.created_at).format('MMMM D, YYYY')}
        </div>
      </div>

      <div className='flex justify-between'>
        <form action={acceptInvite}>
          <input name='team_id' defaultValue={team.id} hidden />
          <input name='invite_id' defaultValue={invite.id} hidden />
          <Button className='w-[100px]'>ACCEPT</Button>
        </form>
        <form action={denyInvite}>
          <input name='invite_id' defaultValue={invite.id} hidden />
          <Button variant='outline' className='w-[100px]'>
            DENY
          </Button>
        </form>
      </div>
    </div>
  )
}
