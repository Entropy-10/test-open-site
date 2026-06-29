import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { routing } from '@navigation'
import { decrypt, encrypt } from '@session'
import { isProd } from '@utils/client'

const intlMiddleware = createIntlMiddleware(routing)

export default async function proxy(request: NextRequest) {
	const response = intlMiddleware(request)

	const session = request.cookies.get('session')?.value
	if (session) {
		const parsed = await decrypt(session)
		parsed.expires = new Date(Date.now() + 604800 * 1000)

		response.cookies.set({
			name: 'session',
			value: await encrypt(parsed),
			sameSite: 'lax',
			httpOnly: true,
			secure: isProd,
			expires: parsed.expires
		})
	}

	response.headers.set('x-pathname', request.nextUrl.pathname)
	return response
}

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
