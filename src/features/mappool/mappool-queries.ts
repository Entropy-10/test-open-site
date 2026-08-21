"use server"

import { cacheTag, cacheLife } from "next/cache"

import { db } from "~/lib/db"
import type { Round } from "~/lib/db/schema"

export async function getMappoolsWithMaps(round: Round) {
  "use cache"
  cacheLife("max")
  cacheTag("mappools")

  return await db.query.mappools.findMany({
    with: { maps: true },
    where: { round }
  })
}
