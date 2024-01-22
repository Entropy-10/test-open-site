import { cookies } from 'next/headers'
import { createClient } from '@supabase/server'

import Invite from './invite'

interface InvitesProps {
  userId: string
}

export default async function Invites({ userId }: InvitesProps) {
  const supabase = createClient(cookies())
  const { data: invites, error } = await supabase
    .from('invites')
    .select('*, teams(id, flag, name, timezone)')
    .eq('user_id', userId)
    .eq('status', 'pending')

  if (error) console.log(error)
  if (!invites || invites.length === 0) {
    return (
      <p className='flex h-[311px] items-center justify-center text-center'>
        You currently do not have any invites. <br />
        Wait for one or create your own team.
      </p>
    )
  }

  return (
    <div className='padding my-5 flex w-full gap-5'>
      {invites.map(invite => (
        <Invite key={invite.id} invite={invite} />
      ))}
    </div>
  )
}
