import { locales } from '@siteConfig'
import createIntlMiddleware from 'next-intl/middleware'

import type { NextRequest } from 'next/server'

const intlMiddleware = createIntlMiddleware({
	locales,
	localePrefix: 'as-needed',
	defaultLocale: 'en'
})

export default function middleware(req: NextRequest) {
	return intlMiddleware(req)
}

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
