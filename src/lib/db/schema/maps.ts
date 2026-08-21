import * as d from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-orm/valibot"

import { timestamps } from "../helpers"
import { modEnum, subModEnum } from "./enums"
import { mappools } from "./mappool"

export const maps = d.snakeCase.table("maps", {
  id: d.integer().primaryKey().notNull(),
  mappoolId: d
    .integer()
    .references(() => mappools.id, { onDelete: "cascade" })
    .notNull(),
  beatmapId: d.integer().notNull(),
  beatmapsetId: d.integer().notNull(),
  slot: d.text().notNull(),
  mod: modEnum().notNull(),
  subMod: subModEnum(),
  name: d.text().notNull(),
  difficulty: d.text().notNull(),
  artist: d.text().notNull(),
  mapper: d.text().notNull(),
  sr: d.doublePrecision().notNull(),
  bpm: d.integer().notNull(),
  length: d.text().notNull(),
  cs: d.doublePrecision().notNull(),
  od: d.doublePrecision().notNull(),
  ar: d.doublePrecision().notNull(),
  dtRate: d.real(),
  modSettings: d.jsonb().array(),
  ...timestamps
})
export const MapSelectSchema = createSelectSchema(maps)
export type Map = typeof maps.$inferSelect
