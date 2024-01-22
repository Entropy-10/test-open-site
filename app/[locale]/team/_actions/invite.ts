'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/server'
import { getSession } from '@utils/server'

export async function invite(formData: FormData) {
  const teamId = formData.get('team_id')?.toString()
  const userId = formData.get('user_id')?.toString()
  const session = getSession()

  if (session?.sub === userId) {
    redirect(
      `/team?title=CANNOT INVITE SELF!&message=You cannot invite yourself to your own team. If you want to switch teams please delete this team first.`
    )
  }

  if (!teamId || !userId) return

  const supabase = createClient(cookies())

  const { error } = await supabase.from('invites').insert({
    team_id: parseInt(teamId),
    user_id: userId,
    updated_at: new Date().toISOString()
  })

  if (error?.code === '23505') {
    redirect(
      `/team?title=PLAYER ALREADY INVITED!&message=Looks like you've already sent that player and invite. Please remove the current invite before trying to reinvite them.`
    )
  } else if (error) {
    redirect(
      `/team?title=FAILED TO INVITE PLAYER!&message=Sorry, we failed to invite that player. Please try again to see if that helps.`
    )
  }

  revalidatePath('/team')
}
