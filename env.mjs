import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_START_DATE: z.string().min(1),
    NEXT_PUBLIC_OSU_CLIENT_ID: z.coerce.number().min(1),
    NEXT_PUBLIC_OSU_REDIRECT_URI: z.string().min(1),
    NEXT_PUBLIC_DISCORD_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_DISCORD_REDIRECT_URI: z.string().min(1),
    NEXT_PUBLIC_UPTIME_API_URL: z.string().min(1),
    NEXT_PUBLIC_STATUS_PAGE_ID: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1)
  },
  server: {
    GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().min(1),
    GOOGLE_PRIVATE_KEY: z.string().min(1),
    OSU_CLIENT_SECRET: z.string().min(1),
    OSU_API_KEY: z.string().min(1),
    DISCORD_CLIENT_SECRET: z.string().min(1),
    BOT_TOKEN: z.string().min(1),
    GUILD_ID: z.string().min(1),
    GUILD_CAPTAIN_ROLE_ID: z.string().min(1),
    GUILD_PLAYER_ROLE_ID: z.string().min(1),
    GUILD_VERIFIED_ROLE_ID: z.string().min(1),
    GUILD_UNVERIFIED_ROLE_ID: z.string().min(1),
    UPTIME_API_KEY: z.string().min(1),
    SUPABASE_SERVICE_KEY: z.string().min(1),
    SUPABASE_JWT_SECRET: z.string().min(1),
    GUILD_LOG_CHANNEL_ID: z.string().min(1),
    SUPABASE_STORAGE_URL: z.string().min(1)
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_START_DATE: process.env.NEXT_PUBLIC_START_DATE,
    NEXT_PUBLIC_OSU_CLIENT_ID: process.env.NEXT_PUBLIC_OSU_CLIENT_ID,
    NEXT_PUBLIC_OSU_REDIRECT_URI: process.env.NEXT_PUBLIC_OSU_REDIRECT_URI,
    NEXT_PUBLIC_DISCORD_CLIENT_ID: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
    NEXT_PUBLIC_DISCORD_REDIRECT_URI:
      process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI,
    NEXT_PUBLIC_UPTIME_API_URL: process.env.NEXT_PUBLIC_UPTIME_API_URL,
    NEXT_PUBLIC_STATUS_PAGE_ID: process.env.NEXT_PUBLIC_STATUS_PAGE_ID,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  }
})
