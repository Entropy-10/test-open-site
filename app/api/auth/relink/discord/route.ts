import { discordAuth } from '@discord'
import { createClient } from '@supabase/server'
import { getBaseUrl } from '@utils/client'
import { getSession } from '@utils/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { getDiscordAvatarUrl } from '../../utils'

import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const session = getSession()
	const searchParams = request.nextUrl.searchParams
	const code = searchParams.get('code')
	const url = new URL(request.url)

	if (!code) return new NextResponse('Missing code', { status: 400 })

	if (!session) {
		return linkingError(
			url,
			'Invalid session. Please trying logging out and back in.'
		)
	}

	const supabase = createClient(cookies())

	try {
		const tokens = await discordAuth.tokenRequest({
			code,
			scope: ['identify', 'guilds.join', 'guilds.members.read'],
			grantType: 'authorization_code',
			redirectUri: `${getBaseUrl()}/api/auth/relink/discord`
		})

		const user = await discordAuth.getUser(tokens.access_token)

		const { error: userError } = await supabase
			.from('users')
			.update({
				discord_id: user.id,
				// @ts-expect-error the discord oauth package I'm using hasn't implemented the correct types yet for api v10
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				discord_name: user.global_name,
				discord_tag: user.username ?? user.discriminator,
				discord_avatar: user.avatar && getDiscordAvatarUrl(user.id, user.avatar)
			})
			.eq('osu_id', session.sub)

		if (userError) throw userError

		const { error: tokensError } = await supabase
			.from('tokens')
			.update({
				discord_access_token: tokens.access_token,
				discord_refresh_token: tokens.refresh_token
			})
			.eq('osu_id', session.sub)

		if (tokensError) throw tokensError

		const returnUrl = cookies().get('return-url')?.value
		if (returnUrl) cookies().delete('return-url')

		return NextResponse.redirect(returnUrl ?? `${url.origin}/profile`)
	} catch (err) {
		linkingError(url)
	}
}

function linkingError(url: URL, message?: string) {
	return NextResponse.redirect(
		`${url.origin}/profile?title=FAILED TO RELINK!&message=${
			message ?? 'Failed to link new Discord account.'
		}`
	)
}
