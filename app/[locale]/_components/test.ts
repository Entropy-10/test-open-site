'use server'

import { cookies } from 'next/headers'
import { verifyJWT } from '@utils'

import type { SessionUser } from '@types'

export function getSession() {
  const sessionCookie = cookies().get('session')?.value
  if (!sessionCookie) return null

  return verifyJWT<SessionUser>(sessionCookie)
}
