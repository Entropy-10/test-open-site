"use server"

import { cacheTag, cacheLife } from "next/cache"

import { db } from "~/lib/db"
import type { Round } from "~/lib/db/schema"

export async function getMappoolWithMaps(round: Round) {
  "use cache"
  cacheLife("max")
  cacheTag("mappool")

  return await db.query.mappools.findFirst({
    with: { maps: true },
    where: { round }
  })
}
