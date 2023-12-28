'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { osuAuthUrl } from '@osu'

// Next.js requires server actions to async functions
// eslint-disable-next-line @typescript-eslint/require-await
export async function signIn(formData: FormData) {
  const returnUrl = formData.get('return-url')?.toString()
  if (returnUrl) cookies().set('return-url', returnUrl)

  redirect(osuAuthUrl)
}
