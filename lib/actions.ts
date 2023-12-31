/* eslint-disable @typescript-eslint/require-await */
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signOut() {
  cookies().delete('session')
  redirect('/')
}
