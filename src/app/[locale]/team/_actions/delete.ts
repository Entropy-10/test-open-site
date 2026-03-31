'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { z } from 'zod'

import { createClient } from '@supabase/server'

export async function deleteItem(formData: FormData) {
	const parsedType = z
		.enum(['player', 'invite'])
		.safeParse(formData.get('type')?.toString())
	const id = formData.get('id')?.toString()
	if (!id || !parsedType.success) return

	const type = parsedType.data
	const supabase = await createClient()
	const t = await getTranslations('TeamPage.Errors')

	const { error } =
		type === 'invite'
			? await supabase.from('invites').delete().eq('id', Number(id))
			: await supabase.from(`players`).delete().eq('user_id', id)

	if (error) {
		redirect(
			`/team?title=${t('DeleteItemFailed.title', {
				type: t(`DeleteItemFailed.Types.${type}`).toUpperCase()
			})}&message=${t('DeleteItemFailed.message', {
				type: t(`DeleteItemFailed.Types.${type}`)
			})}`
		)
	}

	revalidatePath('/team')
}
