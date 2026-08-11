import type { NextRequest } from "next/server"

import { evlogMiddleware } from "evlog/next"
import createMiddleware from "next-intl/middleware"

import { routing } from "./i18n/routing"

export default function proxy(request: NextRequest) {
  evlogMiddleware()(request)
  const handleI18nRouting = createMiddleware(routing)
  return handleI18nRouting(request)
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)"
}
