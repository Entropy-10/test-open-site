/* eslint-disable @typescript-eslint/require-await */
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getBaseUrl } from '@utils/client'
import { getDiscordAuthUrl } from '@discord'

export async function relink(formData: FormData) {
  const pathname = formData.get('pathname')?.toString()
  cookies().set('return-url', `${getBaseUrl()}${pathname ?? '/profile'}`)
  redirect(getDiscordAuthUrl(`${getBaseUrl()}/api/auth/relink/discord`))
}
