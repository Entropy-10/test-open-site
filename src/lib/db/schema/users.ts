import * as d from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-orm/valibot"

import { timestamps } from "../helpers"

export const users = d.snakeCase.table("users", {
  osuId: d.text().primaryKey().notNull(),
  discordId: d.text().notNull(),
  osuAvatar: d.text().notNull(),
  discordAvatar: d.text(),
  osuName: d.text().notNull(),
  discordName: d.text(),
  rank: d.integer(),
  restricted: d.boolean().notNull(),
  countryCode: d.text().notNull(),
  country: d.text().notNull(),
  discordTag: d.text().notNull(),
  countryRank: d.integer(),
  ...timestamps
})
export const UserSelectSchema = createSelectSchema(users)
export type User = typeof users.$inferSelect
