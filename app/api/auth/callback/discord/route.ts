import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { env } from '@env'
import { createClient } from '@supabase/server'
import { Client } from 'osu-web.js'
import { discordAuth } from '@discord'
import { signJWT, verifyJWT } from '@utils'

import { authError } from '../utils'

import type { NextRequest } from 'next/server'
import type { Token } from 'osu-web.js'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const url = new URL(request.url)

  if (!code) return new NextResponse('Missing code', { status: 400 })

  const tokens = await discordAuth.tokenRequest({
    code,
    scope: ['identify', 'guilds.join'],
    grantType: 'authorization_code'
  })

  const osuTokensJWT = cookies().get('osu-tokens')?.value
  if (!osuTokensJWT) return authError(url)

  const osuTokens = verifyJWT<Token>(osuTokensJWT)
  if (!osuTokens) return authError(url)

  const osuClient = new Client(osuTokens.access_token)
  const supabase = createClient(cookies(), env.SUPABASE_SERVICE_KEY)

  try {
    const osuUser = await osuClient.users.getSelf()
    const discordUser = await discordAuth.getUser(tokens.access_token)

    const baseUser = {
      osu_id: osuUser.id.toString(),
      discord_id: discordUser.id,
      osu_name: osuUser.username,
      discord_name: discordUser.username,
      osu_avatar: osuUser.avatar_url,
      discord_avatar: discordUser.avatar,
      rank: osuUser.statistics_rulesets.osu?.global_rank,
      restricted: osuUser.is_restricted
    }

    const { error } = await supabase.from('users').upsert({
      ...baseUser,
      osu_access_token: osuTokens.access_token,
      discord_access_token: tokens.access_token,
      osu_refresh_token: osuTokens.refresh_token,
      discord_refresh_token: tokens.refresh_token
    })

    if (error) throw error

    cookies().delete('osu-tokens')
    cookies().set('session', signJWT(baseUser), { path: '/' })
  } catch (err) {
    console.error(err)
    return authError(url)
  }

  return NextResponse.redirect(url.origin)
}
