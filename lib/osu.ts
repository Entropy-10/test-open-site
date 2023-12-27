import { env } from '@env'
import { Auth, LegacyClient } from 'osu-web.js'

export const osuApi = new LegacyClient(env.OSU_API_KEY)

export const osuAuth = new Auth(
  env.NEXT_PUBLIC_OSU_CLIENT_ID,
  env.OSU_CLIENT_SECRET,
  env.NEXT_PUBLIC_OSU_REDIRECT_URI
).authorizationCodeGrant(['identify', 'public'])
