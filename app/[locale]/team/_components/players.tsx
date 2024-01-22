import { cookies } from 'next/headers'
import { createClient } from '@supabase/server'

import Player from './player'

interface PlayersProps {
  teamId: number
  userId: string
  isCaptain: boolean
}

export default async function Players({
  teamId,
  userId,
  isCaptain
}: PlayersProps) {
  const supabase = createClient(cookies())
  const { data: players } = await supabase
    .from('players')
    .select('*, users(*)')
    .eq('team_id', teamId)
    .order('role')

  if (!players?.[0]) {
    return (
      <div className='flex h-[311px] items-center justify-center'>
        Sorry, we failed to get the players on your team.
      </div>
    )
  }

  //todo: make this a carousel to match design and prevent squishing of player cards
  return (
    <div className='padding my-5 flex w-full gap-5'>
      {players.map(player => (
        <Player
          key={player.user_id}
          player={player}
          userId={userId}
          isCaptain={isCaptain}
        />
      ))}
    </div>
  )
}
