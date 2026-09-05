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
    players: r.many.players()
  },
  players: {
    user: r.one.users({
      from: r.players.userId,
      to: r.users.osuId
    }),
    team: r.one.teams({
      from: r.players.teamId,
      to: r.teams.id
    })
  }
}))
