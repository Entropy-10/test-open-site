import { cookies } from 'next/headers'
import { createClient } from '@supabase/server'

import Player from './player'

interface PlayersProps {
  teamId: string
}

export default async function Players({ teamId }: PlayersProps) {
  const supabase = createClient(cookies())
  const { data: players } = await supabase
    .from('players')
    .select('*, users(*)')
    .eq('team_id', teamId)

  if (!players) return null

  return (
    <div className='h-48'>
      {players?.map(player => <Player key={player.user_id} player={player} />)}
    </div>
  )
}
