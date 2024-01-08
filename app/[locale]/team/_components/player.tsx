import type { Tables } from '~/types/supabase'

interface PlayerProps {
  player: Tables<'players'> & { users: Tables<'users'> | null }
}

export default function Player({ player }: PlayerProps) {
  if (!player.users) return null
  const user = player.users

  return (
    <div>
      {user.osu_name}
      {player.role}
    </div>
  )
}
