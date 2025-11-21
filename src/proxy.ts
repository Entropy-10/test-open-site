import { type NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { CsrfError, createCsrfProtect } from '@edge-csrf/nextjs'

import { env } from '@env'
import { routing } from '@navigation'
import { decrypt, encrypt } from '@session'
import { isProd } from '@utils/client'

const intlMiddleware = createIntlMiddleware(routing)

const csrfProtect = createCsrfProtect({
	cookie: {
		secure: env.VERCEL_ENV === 'production'
	}
})

export default async function proxy(request: NextRequest) {
	const response = intlMiddleware(request)

	try {
		await csrfProtect(request, response)
	} catch (error) {
		if (error instanceof CsrfError) {
			return new NextResponse('invalid csrf token', { status: 403 })
		}
		throw error
	}

	if (request.nextUrl.pathname === '/csrf-token') {
		return NextResponse.json({
			csrfToken: response.headers.get('X-CSRF-Token') ?? 'missing'
		})
	}

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
