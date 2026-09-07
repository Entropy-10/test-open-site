"use server"

import { cacheLife, cacheTag } from "next/cache"

import { db } from "~/lib/db"
import { log, serializeError } from "~/lib/evlog"

export async function getTeamsWithPlayers() {
  "use cache"
  cacheLife("max")
  cacheTag("teams")

  try {
    const teams = await db.query.teams.findMany({
      with: { players: { with: { user: true } } }
    })

    if (!teams) return
    return teams
  } catch (error) {
    log.error({
      component: "teams-query",
      message: "Failed to load teams",
      error: serializeError(error)
    })
    throw error
  }
}
