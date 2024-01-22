'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/server'
import { getSession } from '@utils/server'
import { AxiosError } from 'axios'
import { Client } from 'osu-web.js'
import { osuAuth } from '@osu'

import type { StatisticsRulesets, UserExtended } from 'osu-web.js'

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

    let osuClient = new Client(tokens.osu_access_token)
    let user:
      | (UserExtended & {
          is_restricted: boolean
          statistics_rulesets: StatisticsRulesets
        })
      | null = null

    try {
      user = await osuClient.users.getSelf()
    } catch (err) {
      if (
        err instanceof AxiosError &&
        err.response?.statusText === 'Unauthorized'
      ) {
        const newTokens = await osuAuth.refreshToken(tokens.osu_refresh_token)
        const { error } = await supabase
          .from('tokens')
          .update({
            osu_access_token: newTokens.access_token,
            osu_refresh_token: newTokens.refresh_token
          })
          .eq('osu_id', session.sub)
        if (error) throw error
        osuClient = new Client(newTokens.access_token)
        user = await osuClient.users.getSelf()
      }
    }

    if (!user) throw new Error('Failed to get user!')

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
    `${pathname ?? '/profile'}?title=FAILED TO UPDATE!&message=${
      message ??
      'Sorry, we failed to update your osu profile info. Please try again to see if that helps.'
    }`
  )
}
