'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { getSession } from '@session'
import { createClient } from '@supabase/server'

export async function acceptInvite(formData: FormData) {
	const inviteId = formData.get('invite_id')?.toString()
	const teamId = formData.get('team_id')?.toString()
	const session = await getSession()
	if (!inviteId || !teamId || !session) return

	const t = await getTranslations('ProfilePage.Errors')

	try {
		const supabase = await createClient()
		const { error: teamError } = await supabase.from('players').insert({
			team_id: parseInt(teamId, 10),
			user_id: session.sub,
			role: 'player',
			joined_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		})

		if (teamError?.code === '23505') {
			redirect(
				`/profile?title=${t('ExistingTeam.title')}&message=${t(
					'ExistingTeam.message'
				)}`
			)
		} else if (teamError) throw teamError

		const { error: inviteError } = await supabase
			.from('invites')
			.update({ status: 'accepted' })
			.eq('id', Number(inviteId))

		if (inviteError) throw inviteError
	} catch (_) {
		redirect(
			`/profile?title=${t('FailedInvite.title', {
				type: t('FailedInvite.Types.accept').toUpperCase()
			})}&message=${t('FailedInvite.message', {
				type: t('FailedInvite.Types.accept')
			})}`
		)
	}

	revalidatePath('/profile')
}
