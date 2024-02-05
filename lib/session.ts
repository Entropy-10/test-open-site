import { env } from '@env'
import { Session } from '@types'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const key = new TextEncoder().encode(env.SUPABASE_JWT_SECRET)

// biome-ignore lint/suspicious/noExplicitAny: allow any type of payload
export async function encrypt(payload: any, expiry?: string | number | Date) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(expiry ?? '1 week from now')
		.sign(key)
}

// biome-ignore lint/suspicious/noExplicitAny: prevents error when setting expires claim
export async function decrypt<T>(input: string): Promise<T | any> {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ['HS256']
	})
	return payload as T
}

export async function getSession() {
	const session = cookies().get('session')?.value
	if (!session) return null
	return (await decrypt(session)) as Session
}

export async function deleteSession() {
	cookies().set('session', '', { expires: new Date(0) })
}
