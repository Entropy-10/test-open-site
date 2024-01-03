'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/server'
import { getSession } from '@utils/server'
import { Client } from 'osu-web.js'

export async function update(formData: FormData) {
  const pathname = formData.get('pathname')?.toString()
  const session = getSession()
  if (!session) {
    return updateError(
      pathname,
      'Invalid session. Please trying logging out and back in.'
    )
  }

  try {
    const supabase = createClient(cookies())
    const { data: tokens } = await supabase
      .from('tokens')
      .select()
      .maybeSingle()

    if (!tokens) throw Error('Failed to get user access tokens!')

    const osuClient = new Client(tokens.osu_access_token)
    const user = await osuClient.users.getSelf()

    const { error: userError } = await supabase
      .from('users')
      .update({
        osu_name: user.username,
        osu_avatar: user.avatar_url,
        restricted: user.is_restricted,
        rank: user.statistics_rulesets.osu?.global_rank,
        country: user.country.name,
        country_code: user.country.code
      })
      .eq('osu_id', session.sub)

    if (userError) throw userError

    revalidatePath('/profile')
  } catch (err) {
    updateError(pathname)
  }
}

function updateError(pathname: string | undefined, message?: string) {
  redirect(
    `${pathname ?? '/profile'}?type=osu&error=${
      message ?? 'Failed to update osu! profile information.'
    }`
  )
}
