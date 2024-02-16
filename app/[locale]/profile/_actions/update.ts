'use server'

import { osuAuth } from '@osu'
import { getSession } from '@session'
import { createClient } from '@supabase/server'
import { getServerTranslations } from '@utils/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Client, isOsuJSError } from 'osu-web.js'

import type { StatisticsRulesets, UserExtended } from 'osu-web.js'

export async function update(formData: FormData) {
	const session = await getSession()
	const t = await getServerTranslations('ProfilePage.Errors')

	if (!session) {
		return updateError(t)
	}

	try {
		const supabase = createClient(cookies())
		const { data: tokens } = await supabase
			.from('tokens')
			.select()
			.maybeSingle()

		if (!tokens) throw Error('Failed to get user access tokens!')

		let osuClient = new Client(tokens.osu_access_token)
		let user:
			| (UserExtended & {
					is_restricted: boolean
					statistics_rulesets: StatisticsRulesets
			  })
			| null = null

		try {
			user = await osuClient.users.getSelf()
		} catch (err) {
			if (
				isOsuJSError(err) &&
				err.type === 'unexpected_response' &&
				err.response().statusText === 'Unauthorized'
			) {
				const newTokens = await osuAuth.refreshToken(tokens.osu_refresh_token)
				const { error } = await supabase
					.from('tokens')
					.update({
						osu_access_token: newTokens.access_token,
						osu_refresh_token: newTokens.refresh_token
					})
					.eq('osu_id', session.sub)
				if (error) throw error
				osuClient = new Client(newTokens.access_token)
				user = await osuClient.users.getSelf()
			}
		}

		if (!user) throw new Error('Failed to get user!')

		const { error: userError } = await supabase
			.from('users')
			.update({
				osu_name: user.username,
				osu_avatar: user.avatar_url,
				restricted: user.is_restricted,
				rank: user.statistics_rulesets.osu?.global_rank,
				country: user.country.name,
				country_code: user.country.code
			})
			.eq('osu_id', session.sub)

		if (userError) throw userError

		revalidatePath('/profile')
	} catch (err) {
		updateError(t)
	}
}

function updateError(t: Awaited<ReturnType<typeof getServerTranslations>>) {
	redirect(
		`/profile?title=${t('FailedUpdate.title')}&message=${t(
			'FailedUpdate.message'
		)}`
	)
}
