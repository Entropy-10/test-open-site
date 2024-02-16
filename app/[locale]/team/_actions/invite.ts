'use server'

import { getSession } from '@session'
import { createClient } from '@supabase/server'
import { getServerTranslations } from '@utils/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function invite(formData: FormData) {
	const teamId = formData.get('team_id')?.toString()
	const userId = formData.get('user_id')?.toString()
	const session = await getSession()
	const t = await getServerTranslations('TeamPage.Errors')

	if (session?.sub === userId) {
		redirect(
			`/team?title=${t('InvitedSelf.title')}&message=${t(
				'InvitedSelf.message'
			)}`
		)
	}

	if (!teamId || !userId) return

	const supabase = createClient(cookies())

	const { data: player } = await supabase
		.from('players')
		.select()
		.eq('team_id', teamId)
		.eq('user_id', userId)

	if (player) {
		redirect(
			`/team?title=${t('PlayerOnTeam.title')}&message=${t(
				'PlayerOnTeam.message'
			)}`
		)
	}

	const { error: inviteError } = await supabase.from('invites').insert({
		team_id: parseInt(teamId),
		user_id: userId,
		updated_at: new Date().toISOString()
	})

	if (inviteError?.code === '23505') {
		redirect(
			`/team?title=${t('AlreadyInvited.title')}&message=${t(
				'AlreadyInvited.message'
			)}`
		)
	} else if (inviteError) {
		redirect(
			`/team?title=${t('InviteFailed.title')}&message=${t(
				'InviteFailed.message'
			)}`
		)
	}

	revalidatePath('/team')
}
