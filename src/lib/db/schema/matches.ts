import * as d from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-orm/valibot"

import { matchTypeEnum } from "./enums"
import { teams } from "./teams"

export const matches = d.snakeCase.table("matches", {
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  round: d.text().notNull(),
  matchId: d.integer().notNull().unique(),
  date: d.text().notNull(),
  time: d.text().notNull(),
  referee: d.text(),
  createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
  team1Score: d.integer().notNull(),
  team2Score: d.integer().notNull(),
  team1Id: d
    .integer()
    .notNull()
    .references(() => teams.id),
  team2Id: d
    .integer()
    .notNull()
    .references(() => teams.id),
  type: matchTypeEnum().notNull(),
  forfeitedTeam: d.text()
})
export const MatchSelectSchema = createSelectSchema(matches)
export type Match = typeof matches.$inferSelect
