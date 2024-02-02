'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signOut(csrfToken: string) {
	cookies().delete('session')
	redirect('/')
}

export async function reset(formData: FormData) {
	const pathname = formData.get('pathname')?.toString()
	redirect(pathname ?? '/')
}
