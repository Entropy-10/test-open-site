'use server'

import { createClient } from '@supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function deletePlayer(formData: FormData) {
	const userId = formData.get('player_id')?.toString()
	if (!userId) return

	const supabase = createClient(cookies())
	const { error } = await supabase
		.from('players')
		.delete()
		.eq('user_id', userId)

	if (error) return console.log(error)

	revalidatePath('')
}
