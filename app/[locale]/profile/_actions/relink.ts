'use server'

import { getDiscordAuthUrl } from '@discord'
import { getBaseUrl } from '@utils/client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function relink(formData: FormData) {
	const pathname = formData.get('pathname')?.toString()
	cookies().set('return-url', `${getBaseUrl()}${pathname ?? '/profile'}`)
	redirect(getDiscordAuthUrl(`${getBaseUrl()}/api/auth/relink/discord`))
}
