import * as v from "valibot"

import { log } from "~/lib/evlog"

const MAX_BODY_BYTES = 32 * 1024

const ClientEventSchema = v.looseObject({
  level: v.picklist(["debug", "info", "warn", "error"]),
  timestamp: v.optional(v.string())
})

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin")
  const host = request.headers.get("host")
  if (!origin || !host || !URL.canParse(origin)) return false
  return new URL(origin).host === host
}

function refererPath(request: Request) {
  const referer = request.headers.get("referer")
  if (referer && URL.canParse(referer)) return new URL(referer).pathname
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 })

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) return new Response(null, { status: 413 })

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return new Response(null, { status: 400 })
  }

  const { success, output } = v.safeParse(ClientEventSchema, body)
  if (!success) return new Response(null, { status: 400 })

  const { level, timestamp, service: _service, ...rest } = output
  const event = {
    ...rest,
    source: "client",
    clientTimestamp: timestamp,
    path: refererPath(request),
    userAgent: request.headers.get("user-agent")
  }

  if (level === "error") log.error(event)
  else if (level === "warn") log.warn(event)
  else if (level === "info") log.info(event)
  else log.debug(event)

  return new Response(null, { status: 204 })
}
