import { cookies } from 'next/headers'
import { createClient } from '@supabase/server'
import { getSession } from '@utils/server'

export default async function ProfilePage() {
  const session = getSession()
  console.log(session)
  const supabase = createClient(cookies())

  const { data, error } = await supabase.from('tokens').select().single()

  console.log(data?.osu_id)
  if (error) console.log(error)

  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}
