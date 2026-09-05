"use server"

import { cacheTag, cacheLife } from "next/cache"

import { db } from "~/lib/db"

export async function getTeamsWithPlayers() {
  "use cache"
  cacheLife("max")
  cacheTag("teams")

  const teams = await db.query.teams.findMany({
    with: { players: { with: { user: true } } }
  })

  if (!teams) return
  return teams
}
