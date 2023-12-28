'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getBaseUrl } from '@utils/client'
import { osuAuthUrl } from '@osu'

// Next.js requires server actions to async functions
// eslint-disable-next-line @typescript-eslint/require-await
export async function signIn(formData: FormData) {
  const returnPath = formData.get('return-path')?.toString()
  if (returnPath) cookies().set('return-url', getBaseUrl() + returnPath)

  redirect(osuAuthUrl)
}
