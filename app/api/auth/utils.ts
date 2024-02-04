import { NextResponse } from 'next/server'

export function authError(url: URL, message?: string) {
	return NextResponse.redirect(
		`${url.origin}/unauthorized?type=auth-error&message=${
			message ?? 'Failed to authenticate user'
		}`
	)
}

export function getDiscordAvatarUrl(userId: string, avatarHash: string) {
	return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.webp?size=240`
}
