'use server'

import { discordAuth } from '@discord'
import { getSession } from '@session'
import { createClient } from '@supabase/server'
import { getServerTranslations } from '@utils/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Client } from 'osu-web.js'

export async function deleteAccount(csrfToken: string) {
	const session = await getSession()
	const t = await getServerTranslations('ProfilePage.Errors')

	if (!session) return deleteAccountError(t)

	const supabase = createClient(cookies())

	const { data: player, error: playerError } = await supabase
		.from('players')
		.select('*')
		.eq('user_id', session.sub)
		.maybeSingle()

	if (playerError) return deleteAccountError(t)

	if (player) {
		return {
			error: {
				title: t('CurrentTeam.title'),
				message: t('CurrentTeam.message')
			}
		}
	}

	const { data: tokens, error: tokensError } = await supabase
		.from('tokens')
		.select('*')
		.maybeSingle()

	if (!tokens || tokensError) return deleteAccountError(t)

	const osuClient = new Client(tokens.osu_access_token)

	try {
		await Promise.all([
			osuClient.revokeToken(),
			discordAuth.revokeToken(tokens.discord_access_token)
		])
	} catch (err) {
		return deleteAccountError(t)
	}

	const { error: userError } = await supabase
		.from('users')
		.delete()
		.eq('osu_id', session.sub)

	if (userError) return deleteAccountError(t)

	cookies().delete('session')
	redirect('/')
}

function deleteAccountError(
	t: Awaited<ReturnType<typeof getServerTranslations>>
) {
	return {
		error: {
			title: t('FailedAccountDelete.title'),
			message: t('FailedAccountDelete.message')
		}
	}
}
