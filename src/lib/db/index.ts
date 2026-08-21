import { ENV } from "varlock/env"

import { relations } from "./relations"

async function createDb() {
  if (ENV.APP_ENV === "development") {
    const { Pool } = await import("pg")
    const { drizzle } = await import("drizzle-orm/node-postgres")

    const pool = new Pool({ connectionString: ENV.DATABASE_URL })
    return drizzle({ client: pool, relations })
  }

  const { Pool, neonConfig } = await import("@neondatabase/serverless")
  const { drizzle } = await import("drizzle-orm/neon-serverless")

  neonConfig.pipelineConnect = false
  neonConfig.wsProxy = (host, port) => `${host}/v2?address=${host}:${port}`

  const pool = new Pool({ connectionString: ENV.DATABASE_URL })
  return drizzle({ client: pool, relations })
}

const db = await createDb()

export { db }
