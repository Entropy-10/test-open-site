import * as d from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-orm/valibot"

import { timestamps } from "../helpers"

export const teams = d.snakeCase.table("teams", {
  id: d.integer().primaryKey().notNull(),
  availability: d.jsonb(),
  available_ending: d.text(),
  available_starting: d.text(),
  flag: d.text().notNull(),
  name: d.text().notNull(),
  acronym: d.text().notNull(),
  qual_lobby_id: d.integer(),
  timezone: d.text().notNull(),
  ...timestamps
})
export const TeamSelectSchema = createSelectSchema(teams)
export type Team = typeof teams.$inferSelect
