import { env } from '@env'
import { LegacyClient } from 'osu-web.js'

export const osuApi = new LegacyClient(env.OSU_API_KEY)
