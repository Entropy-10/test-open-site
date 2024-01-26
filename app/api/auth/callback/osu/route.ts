import { getDiscordAuthUrl } from '@discord'
import { osuAuth } from '@osu'
import { signJWT } from '@utils/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { authError } from '../../utils'

import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const code = searchParams.get('code')
	const url = new URL(request.url)

	if (!code) return authError(url)

	try {
		const tokens = await osuAuth.requestToken(code)
		cookies().set('osu-tokens', signJWT(tokens), { path: '/' })
	} catch (err) {
		console.error(err)
		return authError(url)
	}

	return NextResponse.redirect(getDiscordAuthUrl())
}
