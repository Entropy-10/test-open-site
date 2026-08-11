import { createBetterStackDrain } from "evlog/better-stack"
import {
  createUserAgentEnricher,
  createRequestSizeEnricher
} from "evlog/enrichers"
import { createEvlog } from "evlog/next"
import { createInstrumentation } from "evlog/next/instrumentation/create"
import { createDrainPipeline } from "evlog/pipeline"
import { ENV } from "varlock/env"
import type { DrainContext } from "evlog"

const enrichers = [createUserAgentEnricher(), createRequestSizeEnricher()]

const pipeline = createDrainPipeline<DrainContext>({
  batch: { size: 50, intervalMs: 5000 },
  retry: { maxAttempts: 3 }
})

export const drain = pipeline(
  createBetterStackDrain({
    apiKey: ENV.BETTER_STACK_WEBSITE_SOURCE_TOKEN,
    endpoint: ENV.BETTER_STACK_INGEST_HOST
  })
)

export const { register, onRequestError } = createInstrumentation({
  drain,
  service: "test-open-site"
})

export const { withEvlog, useLogger, log, createError } = createEvlog({
  drain,
  service: "test-open-site",
  sampling: {
    rates: { info: 10 },
    keep: [{ status: 400 }, { duration: 1000 }]
  },
  enrich: (ctx) => {
    for (const enricher of enrichers) enricher(ctx)
    ctx.event.deploymentId = ENV.VERCEL_DEPLOYMENT_ID
    ctx.event.region = ENV.VERCEL_REGION
  }
})
