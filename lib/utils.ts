import { Inter } from 'next/font/google'
import { env } from '@env'
import { clsx } from 'clsx'
import jwt from 'jsonwebtoken'
import { twMerge } from 'tailwind-merge'

import type { SessionUser } from '@types'
import type { ClassValue } from 'clsx'
import type { cookies } from 'next/headers'

export const isProd = process.env.VERCEL_ENV === 'production'

export const inter = Inter({ subsets: ['latin'] })

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export function pad(number: number) {
  return String(number).padStart(2, '0')
}

export function signJWT(payload: string | object | Buffer) {
  return jwt.sign(payload, env.JWT_SECRET, {
    header: { alg: 'HS256', typ: 'JWT' }
  })
}

export function verifyJWT<T extends string | object | Buffer>(token: string) {
  try {
    return jwt.verify(token, env.JWT_SECRET) as T
  } catch {
    return null
  }
}

export function getSession(cookieStore: ReturnType<typeof cookies>) {
  const sessionCookie = cookieStore.get('session')?.value
  if (!sessionCookie) return null

  return verifyJWT<SessionUser>(sessionCookie)
}
