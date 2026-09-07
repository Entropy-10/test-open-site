"use server"

import { cacheTag, cacheLife } from "next/cache"

import { db } from "~/lib/db"

export async function getMatchesWithTeamsAndPlayers() {
  "use cache"
  cacheLife("max")
  cacheTag("schedule")

  const matches = await db.query.matches.findMany({
    with: {
      team1: {
        with: { players: { with: { user: { columns: { rank: true } } } } }
      },
      team2: {
        with: { players: { with: { user: { columns: { rank: true } } } } }
      }
    },
    where: { round: "grand finals" },
    orderBy: { matchId: "asc" }
  })
  return matches
}
