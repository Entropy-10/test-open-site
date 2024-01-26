'use server'

import { createClient } from '@supabase/server'
import { getSession } from '@utils/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function acceptInvite(formData: FormData) {
	const inviteId = formData.get('invite_id')?.toString()
	const teamId = formData.get('team_id')?.toString()
	const session = getSession()
	if (!inviteId || !teamId || !session) return

	try {
		const supabase = createClient(cookies())
		const { error: teamError } = await supabase.from('players').insert({
			team_id: parseInt(teamId),
			user_id: session.sub,
			role: 'player',
			joined_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		})

		if (teamError?.code === '23505') {
			redirect(
				'/profile?title=ALREADY ON A TEAM!&message=Looks like you are already on a team. Please delete or leave your current team before joining a new one.'
			)
		} else if (teamError) throw teamError

		const { error: inviteError } = await supabase
			.from('invites')
			.update({ status: 'accepted' })
			.eq('id', inviteId)

		if (inviteError) throw inviteError
	} catch (err) {
		redirect(
			'/profile?title=FAILED TO ACCEPT INVITE!&message=Sorry, we failed to accept that invite. Please try again to see if that helps.'
		)
	}

	revalidatePath('/profile')
}
