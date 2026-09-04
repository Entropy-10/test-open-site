import type { NextRequest } from "next/server"

import { evlogMiddleware } from "evlog/next"
import createMiddleware from "next-intl/middleware"

import { routing } from "./i18n/routing"

const handleI18nRouting = createMiddleware(routing)
const handleEvlog = evlogMiddleware()

export default async function proxy(request: NextRequest) {
  const correlated = await handleEvlog(request)
  const response = handleI18nRouting(request)

  const requestId = correlated.headers.get("x-request-id")
  if (requestId) response.headers.set("x-request-id", requestId)

  return response
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)"
}
