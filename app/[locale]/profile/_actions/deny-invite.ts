'use server'

import { createClient } from '@supabase/server'
import { getServerTranslations } from '@utils/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function denyInvite(formData: FormData) {
	const inviteId = formData.get('invite_id')?.toString()
	if (!inviteId) return

	const t = await getServerTranslations('ProfilePage.Errors')
	const supabase = createClient(cookies())

	const { error } = await supabase
		.from('invites')
		.update({ status: 'denied' })
		.eq('id', inviteId)

	if (error) {
		redirect(
			`/profile?title=${t('FailedInvite.title', {
				type: t('FailedInvite.Types.deny')
			})}&message=${t('FailedInvite.message', {
				type: t('FailedInvite.Types.deny')
			})}`
		)
	}
	revalidatePath('/profile')
}
