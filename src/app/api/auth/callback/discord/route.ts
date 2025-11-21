import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getTranslations } from 'next-intl/server'
import type { Token } from 'osu-web.js'
import { Client } from 'osu-web.js'

import { discordAuth } from '@discord'
import { env } from '@env'
import { decrypt, encrypt } from '@session'
import { createClient } from '@supabase/server'
import { isProd } from '@utils/client'

import { authError, getDiscordAvatarUrl } from '../../utils'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const locale = searchParams.get('locale') ?? 'en'
	const code = searchParams.get('code')
	const url = new URL(request.url)

	const t = await getTranslations({ locale, namespace: 'APICallbacks' })

	if (!code) {
		return authError(url, t('Errors.missingCode'))
	}

	const tokens = await discordAuth.tokenRequest({
		code,
		scope: ['identify', 'guilds.members.read'],
		grantType: 'authorization_code'
	})

	const osuTokensJWT = (await cookies()).get('osu-tokens')?.value
	if (!osuTokensJWT) return authError(url)

	const osuTokens = await decrypt<Token>(osuTokensJWT)
	if (!osuTokens) return authError(url)

	const osuClient = new Client(osuTokens.access_token)
	const supabase = await createClient(env.SUPABASE_SERVICE_KEY)

	try {
		const discordUser = await discordAuth.getUser(tokens.access_token)
		const osuUser = await osuClient.users.getSelf({
			urlParams: { mode: 'osu' }
		})

		const { error: userError } = await supabase.from('users').upsert({
			osu_id: osuUser.id.toString(),
			osu_name: osuUser.username,
			osu_avatar: osuUser.avatar_url,
			restricted: osuUser.is_restricted,
			rank: osuUser.statistics.global_rank,
			country: osuUser.country.name,
			country_code: osuUser.country.code,
			country_rank: osuUser.statistics.country_rank,
			discord_id: discordUser.id,
			discord_name: discordUser.global_name ?? discordUser.username,
			discord_tag: discordUser.username,
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
			discord_refresh_token: tokens.refresh_token,
			old: false
		})

		if (tokenError) throw tokenError

		const expires = new Date(Date.now() + 604800 * 1000)
		const session = await encrypt({
			sub: osuUser.id.toString(),
			role: 'authenticated',
			user: {
				osu_name: osuUser.username,
				osu_avatar: osuUser.avatar_url,
				restricted: osuUser.is_restricted,
				discord_id: discordUser.id
			},
			expires
		})
		const cookiesList = await cookies()
		cookiesList.delete('osu-tokens')
		cookiesList.set('session', session, {
			expires,
			sameSite: 'lax',
			httpOnly: true,
			secure: isProd
		})
	} catch (_) {
		const cookiesList = await cookies()
		cookiesList.delete('return-url')
		cookiesList.delete('osu-tokens')
		return authError(url)
	}

	const returnUrl = (await cookies()).get('return-url')?.value
	if (returnUrl) (await cookies()).delete('return-url')

	return NextResponse.redirect(returnUrl ?? url.origin)
}
