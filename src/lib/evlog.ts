import { createBetterStackDrain } from "evlog/better-stack"
import { createEvlog } from "evlog/next"
import {
  createInstrumentation,
  DEFAULT_CAPTURE_OUTPUT_IGNORE
} from "evlog/next/instrumentation/create"
import { createDrainPipeline } from "evlog/pipeline"
import { ENV } from "varlock/env"
import type { DrainContext } from "evlog"

const service = "test-open-site"

const ship = createDrainPipeline<DrainContext>({
  batch: { size: 50, intervalMs: 5000 },
  retry: { maxAttempts: 3 },
  onDropped: (events, error) =>
    console.error(
      `[evlog] dropped ${events.length} event(s) before Better Stack`,
      error
    )
})(
  createBetterStackDrain({
    apiKey: ENV.BETTER_STACK_WEBSITE_SOURCE_TOKEN,
    endpoint: ENV.BETTER_STACK_INGEST_HOST
  })
)

function drain(ctx: DrainContext) {
  ctx.event.deploymentId = ENV.VERCEL_DEPLOYMENT_ID
  ship(ctx)
}

const shared = {
  service,
  drain,
  env: { environment: ENV.APP_ENV },
  sampling: { rates: { debug: ENV.APP_ENV === "production" ? 0 : 100 } }
}

export const { register, onRequestError } = createInstrumentation({
  ...shared,
  captureOutput: {
    stdout: false,
    stderr: true,
    ignore: [...DEFAULT_CAPTURE_OUTPUT_IGNORE, "[evlog]"]
  }
})

export const { withEvlog, useLogger, log, createError } = createEvlog(shared)

export function serializeError(error: unknown) {
  if (error instanceof Error) {
    return { name: error.name, message: error.message, stack: error.stack }
  }
  return { message: String(error) }
}
