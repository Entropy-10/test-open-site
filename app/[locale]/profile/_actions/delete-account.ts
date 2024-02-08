'use server'

import { discordAuth } from '@discord'
import { getSession } from '@session'
import { createClient } from '@supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Client } from 'osu-web.js'

export async function deleteAccount(csrfToken: string) {
	const session = await getSession()
	if (!session) return deleteAccountError()

	const supabase = createClient(cookies())

	const { data: player, error: playerError } = await supabase
		.from('players')
		.select('*')
		.eq('user_id', session.sub)
		.maybeSingle()

	if (playerError) return deleteAccountError()

	if (player) {
		return {
			error: {
				title: 'CURRENTLY ON TEAM!',
				message:
					'Looks like you are still on a team. Please leave or delete the team first before deleting your account.'
			}
		}
	}

	const { data: tokens, error: tokensError } = await supabase
		.from('tokens')
		.select('*')
		.maybeSingle()

	if (!tokens || tokensError) return deleteAccountError()

	const osuClient = new Client(tokens.osu_access_token)

	try {
		osuClient.revokeToken()
		discordAuth.revokeToken(tokens.discord_access_token)
	} catch (err) {
		return deleteAccountError()
	}

	const { error: userError } = await supabase
		.from('users')
		.delete()
		.eq('osu_id', session.sub)

	if (userError) return deleteAccountError()

	cookies().delete('session')
	redirect('/')
}

function deleteAccountError() {
	return {
		error: {
			title: 'FAILED TO DELETE ACCOUNT!',
			message:
				'Sorry, looks like we failed to delete your account. Please try again to see if that helps.'
		}
	}
}
