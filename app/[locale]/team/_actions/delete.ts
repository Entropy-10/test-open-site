'use server'

import { createClient } from '@supabase/server'
import { getServerTranslations } from '@utils/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function deleteItem(formData: FormData) {
	const parsedType = z
		.enum(['player', 'invite'])
		.safeParse(formData.get('type')?.toString())
	const id = formData.get('id')?.toString()
	if (!id || !parsedType.success) return

	const type = parsedType.data
	const supabase = createClient(cookies())
	const t = await getServerTranslations('TeamPage.Errors')

	const { error } = await supabase
		.from(`${type}s`)
		.delete()
		.eq(type === 'invite' ? 'id' : 'user_id', id)

	if (error) {
		console.log(error)
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
