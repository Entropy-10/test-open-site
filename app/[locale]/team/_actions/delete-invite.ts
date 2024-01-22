'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/server'

export async function deleteInvite(formData: FormData) {
  const inviteId = formData.get('invite_id')?.toString()
  if (!inviteId) return

  const supabase = createClient(cookies())
  const { error } = await supabase.from('invites').delete().eq('id', inviteId)
  if (error) {
    console.log(error)
    redirect(
      '/team?title=FAILED TO DELETE!&message=Sorry, we failed to delete that invite. Please try again to see if that helps.'
    )
  }

  revalidatePath('/team')
}
