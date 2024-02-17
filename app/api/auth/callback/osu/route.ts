import { getDiscordAuthUrl } from '@discord'
import { osuAuth } from '@osu'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { authError } from '../../utils'

import { encrypt } from '@session'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const code = searchParams.get('code')
	const url = new URL(request.url)

	if (!code) {
		return authError(
			url,
			"Sorry, but the sign in couldn't be completed. If unexpected please try again otherwise feel free to navigate back home."
		)
	}

	try {
		cookies().delete('session')
		const tokens = await osuAuth.requestToken(code)
		cookies().set('osu-tokens', await encrypt(tokens, '10 mins from now'), {
			httpOnly: true
		})
	} catch (err) {
		console.error(err)
		return authError(url)
	}

	return NextResponse.redirect(getDiscordAuthUrl())
}
