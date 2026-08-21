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
  }
}))
