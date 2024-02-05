'use server'

import { redirect } from '@navigation'
import { deleteSession } from '@session'

export async function signOut(csrfToken: string) {
	await deleteSession()
	redirect('/')
}

export async function reset(formData: FormData) {
	const pathname = formData.get('pathname')?.toString()
	redirect(pathname ?? '/')
}
