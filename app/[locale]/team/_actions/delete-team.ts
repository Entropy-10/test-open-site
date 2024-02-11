'use server'

import { createClient } from '@supabase/server'
import { getServerTranslations } from '@utils/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function deleteTeam(formData: FormData) {
	const teamId = formData.get('team_id')?.toString()
	const userId = formData.get('user_id')?.toString()
	if (!teamId) return

	const t = await getServerTranslations('TeamPage.Errors')
	const supabase = createClient(cookies())

	const { count } = await supabase
		.from('players')
		.select('*', { count: 'exact' })
		.neq('user_id', userId)

	if (count && count > 0) {
		redirect(
			`/team?title=${t('PlayersOnTeam.title')}&message=${t(
				'PlayersOnTeam.message'
			)}`
		)
	}

	const { error } = await supabase.from('teams').delete().eq('id', teamId)

	if (error) {
		redirect(
			`/team?title=${t('DeleteTeamFailed.title')}&message=${t(
				'DeleteTeamFailed.message'
			)}`
		)
	}

	redirect('/')
}
