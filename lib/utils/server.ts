import 'server-only'

import { env } from '@env'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

import type { Session } from '@types'

export function signJWT(payload: string | object | Buffer) {
	return jwt.sign(payload, env.SUPABASE_JWT_SECRET, {
		header: { alg: 'HS256', typ: 'JWT' }
	})
}

export function verifyJWT<T extends string | object | Buffer>(token: string) {
	try {
		return jwt.verify(token, env.SUPABASE_JWT_SECRET) as T
	} catch {
		return null
	}
}

export function getSession() {
	const sessionCookie = cookies().get('session')?.value
	if (!sessionCookie) return null

	return verifyJWT<Session>(sessionCookie)
}
