import { cacheLife, cacheTag } from "next/cache"

import { db } from "~/lib/db"
import { log, serializeError } from "~/lib/evlog"

export async function getMatchesWithTeamsAndPlayers() {
  "use cache"
  cacheLife("max")
  cacheTag("schedule")

  try {
    return await db.query.matches.findMany({
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
  } catch (error) {
    log.error({
      component: "schedule-query",
      message: "Failed to load matches",
      error: serializeError(error)
    })
    throw error
  }
}
