'use server'

import { createClient } from '@supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function deleteTeam(formData: FormData) {
	const teamId = formData.get('team_id')?.toString()
	const userId = formData.get('user_id')?.toString()
	if (!teamId) return

	const supabase = createClient(cookies())
	const { count } = await supabase
		.from('players')
		.select('*', { count: 'exact' })
		.neq('user_id', userId)

	if (count && count > 0) {
		redirect(
			'/team?title=FAILED TO DELETE TEAM!&message=Please remove all players from the team before deleting the team.'
		)
	}

	const { error } = await supabase.from('teams').delete().eq('id', teamId)

	if (error) return console.log(error)

	redirect('/')
}
