import { defineRelations } from "drizzle-orm"

import * as schema from "./schema"

export const relations = defineRelations(schema, (r) => ({
  mappools: {
    maps: r.many.maps()
  },
  maps: {
    mappool: r.one.mappools({
      from: r.maps.mappoolId,
      to: r.mappools.id
    })
  },
  teams: {
    players: r.many.players(),
    matchesAsTeam1: r.many.matches({
      from: r.teams.id,
      to: r.matches.team1Id,
      alias: "matches_team1"
    }),
    matchesAsTeam2: r.many.matches({
      from: r.teams.id,
      to: r.matches.team2Id,
      alias: "matches_team2"
    })
  },
  matches: {
    team1: r.one.teams({
      from: r.matches.team1Id,
      to: r.teams.id,
      alias: "matches_team1",
      optional: false
    }),
    team2: r.one.teams({
      from: r.matches.team2Id,
      to: r.teams.id,
      alias: "matches_team2",
      optional: false
    })
  },
  players: {
    user: r.one.users({
      from: r.players.userId,
      to: r.users.osuId,
      optional: false
    }),
    team: r.one.teams({
      from: r.players.teamId,
      to: r.teams.id
    })
  }
}))
