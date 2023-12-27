import { env } from '@env'
import Auth from 'discord-oauth2'

export const discordAuth = new Auth({
  clientId: env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
  clientSecret: env.DISCORD_CLIENT_SECRET,
  redirectUri: env.NEXT_PUBLIC_DISCORD_REDIRECT_URI
})

export const discordAuthUrl = discordAuth.generateAuthUrl({
  scope: ['identify', 'guilds.join']
})
