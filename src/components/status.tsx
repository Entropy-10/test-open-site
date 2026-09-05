import { cacheLife } from "next/cache"
import Link from "next/link"

import { getTranslations } from "next-intl/server"
import * as v from "valibot"
import { ENV } from "varlock/env"

import { StatusIcon } from "~/components/icons/status"
import { log } from "~/lib/evlog"

const UptimeStatusPageSchema = v.object({
  id: v.string(),
  type: v.literal("status_page"),
  attributes: v.object({
    aggregate_state: v.picklist([
      "operational",
      "downtime",
      "degraded",
      "maintenance"
    ])
  })
})

type UptimeStatusPage = v.InferOutput<typeof UptimeStatusPageSchema>

const statusColors: Record<
  UptimeStatusPage["attributes"]["aggregate_state"],
  string
> = {
  operational: "rgb(16,185,129)",
  downtime: "rgb(248, 113, 113)",
  degraded: "rgb(245, 158, 11)",
  maintenance: "rgb(96, 165, 250)"
}

export default async function Status() {
  "use cache"
  cacheLife("minutes")

  const t = await getTranslations("Status")
  const pageId = ENV.BETTER_STACK_STATUS_PAGE_ID
  const apiURL = "https://uptime.betterstack.com/api/v2"

  const response = await fetch(`${apiURL}/status-pages/${pageId}`, {
    headers: { Authorization: `Bearer ${ENV.BETTER_STACK_UPTIME_API_KEY}` }
  })

  if (!response.ok) {
    log.error({
      component: "Status",
      message: "Failed to fetch status page",
      httpStatus: response.status,
      pageId
    })
    return null
  }

  const json = await response.json()

  const { success, output, issues } = v.safeParse(
    UptimeStatusPageSchema,
    json.data
  )
  if (!success) {
    log.error({
      component: "Status",
      message: "Unexpected status page response shape",
      pageId,
      issues: issues.map((issue) => issue.message)
    })
    return null
  }

  const status = output.attributes.aggregate_state
  const color = statusColors[status]

  return (
    <Link
      className="hover:bg-blue/30 flex items-center gap-2 rounded-sm px-2 py-1"
      href="https://status.test-open.com"
      target="_blank"
    >
      <StatusIcon style={{ color }} />
      <span className="text-milky-white text-[14px] font-medium">
        {t(status)}
      </span>
    </Link>
  )
}

export function StatusSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-2 rounded-sm px-2 py-1">
      <StatusIcon style={{ opacity: 0.75 }} />
      <span className="text-milky-white/75 text-[14px] font-medium">
        Checking status
      </span>
    </div>
  )
}
