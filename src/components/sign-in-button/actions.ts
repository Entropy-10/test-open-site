'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { osuAuthUrl } from '@osu'
import { getBaseUrl } from '@utils/client'

export async function signIn() {
	const headersList = await headers()
	const pathname = headersList.get('x-pathname') ?? '/'
	if (pathname) (await cookies()).set('return-url', getBaseUrl() + pathname)

	redirect(osuAuthUrl)
}
