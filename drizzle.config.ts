import "varlock/auto-load"

import { defineConfig } from "drizzle-kit"
import { ENV } from "varlock/env"

export default defineConfig({
  schema: "./src/lib/db/schema/index.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: ENV.DATABASE_URL
  },
  verbose: true
})
