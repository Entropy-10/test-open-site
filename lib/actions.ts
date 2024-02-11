'use server'

import { deleteSession } from '@session'
import { redirect } from 'next/navigation'

export async function signOut(csrfToken: string) {
	await deleteSession()
	redirect('/')
}

export async function reset(formData: FormData) {
	const pathname = formData.get('pathname')?.toString()
	redirect(pathname ?? '/')
}
