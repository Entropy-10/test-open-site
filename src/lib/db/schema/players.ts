import * as d from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-orm/valibot"

import { timestamps } from "../helpers"
import { playerRoleEnum } from "./enums"
import { teams } from "./teams"
import { users } from "./users"

export const players = d.snakeCase.table("players", {
  userId: d
    .text()
    .primaryKey()
    .references(() => users.osuId, { onDelete: "cascade" })
    .notNull(),
  teamId: d
    .integer()
    .references(() => teams.id, { onDelete: "cascade" })
    .notNull(),
  role: playerRoleEnum().notNull(),
  joinedAt: d.timestamp({ withTimezone: true }).notNull(),
  ...timestamps
})
export const PlayerSelectSchema = createSelectSchema(players)
export type Player = typeof players.$inferSelect
