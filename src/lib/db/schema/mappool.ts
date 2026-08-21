import * as d from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-orm/valibot"

import { timestamps } from "../helpers"
import { roundEnum } from "./enums"

export const mappools = d.snakeCase.table("mappools", {
  id: d.integer().primaryKey().notNull(),
  round: roundEnum().notNull(),
  mappack: d.text(),
  released: d.boolean().notNull().default(false),
  ...timestamps
})
export const MappoolSelectSchema = createSelectSchema(mappools)
export type Mappool = typeof mappools.$inferSelect
