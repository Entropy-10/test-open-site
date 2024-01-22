'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/server'

export async function denyInvite(formData: FormData) {
  const inviteId = formData.get('invite_id')?.toString()
  if (!inviteId) return

  const supabase = createClient(cookies())
  const { error } = await supabase
    .from('invites')
    .update({ status: 'denied' })
    .eq('id', inviteId)

  if (error) return console.log(error)
  revalidatePath('/profile')
}
