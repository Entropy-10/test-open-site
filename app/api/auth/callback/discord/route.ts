import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { env } from '@env'
import { createClient } from '@supabase/server'
import { signJWT, verifyJWT } from '@utils/server'
import { Client } from 'osu-web.js'
import { discordAuth } from '@discord'

import { authError, getDiscordAvatarUrl } from '../../utils'

import type { NextRequest } from 'next/server'
import type { Token } from 'osu-web.js'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const url = new URL(request.url)

  if (!code) return new NextResponse('Missing code', { status: 400 })

  const tokens = await discordAuth.tokenRequest({
    code,
    scope: ['identify', 'guilds.join', 'guilds.members.read'],
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

    const { error: userError } = await supabase.from('users').upsert({
      osu_id: osuUser.id.toString(),
      osu_name: osuUser.username,
      osu_avatar: osuUser.avatar_url,
      restricted: osuUser.is_restricted,
      rank: osuUser.statistics_rulesets.osu?.global_rank,
      country: osuUser.country.name,
      country_code: osuUser.country.code,
      discord_id: discordUser.id,
      // @ts-expect-error the discord oauth package I'm using hasn't implemented the correct types yet for api v10
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      discord_name: discordUser.global_name,
      discord_tag: discordUser.username ?? discordUser.discriminator,
      discord_avatar:
        discordUser.avatar &&
        getDiscordAvatarUrl(discordUser.id, discordUser.avatar)
    })

    if (userError) throw userError

    const { error: tokenError } = await supabase.from('tokens').upsert({
      osu_id: osuUser.id.toString(),
      osu_access_token: osuTokens.access_token,
      osu_refresh_token: osuTokens.refresh_token,
      discord_access_token: tokens.access_token,
      discord_refresh_token: tokens.refresh_token
    })

    if (tokenError) throw tokenError

    const sessionData = {
      sub: osuUser.id.toString(),
      role: 'authenticated',
      osu_name: osuUser.username,
      osu_avatar: osuUser.avatar_url,
      restricted: osuUser.is_restricted
    }

    cookies().delete('osu-tokens')
    cookies().set('session', signJWT(sessionData), { path: '/' })
  } catch (err) {
    cookies().delete('return-url')
    cookies().delete('osu-tokens')
    return authError(url)
  }

  const returnUrl = cookies().get('return-url')?.value
  if (returnUrl) cookies().delete('return-url')

  return NextResponse.redirect(returnUrl ?? url.origin)
}
