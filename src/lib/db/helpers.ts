import { timestamp } from "drizzle-orm/pg-core"

export const timestamps = {
  createdAt: timestamp("created_at", { precision: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
}
