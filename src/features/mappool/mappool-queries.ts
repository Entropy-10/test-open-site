"use server"

import { cacheTag, cacheLife } from "next/cache"

import { db } from "~/lib/db"
import { groupByMod } from "~/utils/mods"
import type { Round } from "~/lib/db/schema"

export async function getMappoolWithMaps(round: Round) {
  "use cache"
  cacheLife("max")
  cacheTag("mappool")

  const mappool = await db.query.mappools.findFirst({
    with: { maps: true },
    where: { round }
  })

  if (!mappool) return

  const { maps, ...rest } = mappool
  return { ...rest, pools: groupByMod(maps) }
}
