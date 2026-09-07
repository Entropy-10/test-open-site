"use server"

import { cacheLife, cacheTag } from "next/cache"

import { db } from "~/lib/db"
import { log, serializeError } from "~/lib/evlog"
import { groupByMod } from "~/utils/mods"
import type { Round } from "~/lib/db/schema"

export async function getMappoolWithMaps(round: Round) {
  "use cache"
  cacheLife("max")
  cacheTag("mappool")

  try {
    const mappool = await db.query.mappools.findFirst({
      with: { maps: true },
      where: { round }
    })

    if (!mappool) {
      log.warn({
        component: "mappool-query",
        message: "No mappool found for round",
        round
      })
      return
    }

    const { maps, ...rest } = mappool
    return { ...rest, pools: groupByMod(maps) }
  } catch (error) {
    log.error({
      component: "mappool-query",
      message: "Failed to load the mappool",
      round,
      error: serializeError(error)
    })
    throw error
  }
}
