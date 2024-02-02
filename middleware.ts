import { locales } from '@siteConfig'
import csrf from 'edge-csrf'
import createIntlMiddleware from 'next-intl/middleware'

import { env } from '@env'
import { type NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createIntlMiddleware({
	locales,
	localePrefix: 'as-needed',
	defaultLocale: 'en'
})

const csrfProtect = csrf({
	cookie: {
		secure: env.VERCEL_ENV === 'production'
	}
})

export default async function middleware(request: NextRequest) {
	const response = intlMiddleware(request)
	const csrfError = await csrfProtect(request, response)

	if (csrfError) return new NextResponse('Invalid CSRF token', { status: 403 })

	if (request.nextUrl.pathname === '/csrf-token') {
		return NextResponse.json({
			csrfToken: response.headers.get('X-CSRF-Token') ?? 'missing'
		})
	}

	response.headers.set('x-pathname', request.nextUrl.pathname)
	return response
}

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
