import { env } from '@env'
import { createServerClient } from '@supabase/ssr'

import type { CookieOptions } from '@supabase/ssr'
import type { cookies } from 'next/headers'
import type { Database } from '~/types/supabase'

export const createClient = (
	cookieStore: ReturnType<typeof cookies>,
	serviceKey?: string
) => {
	const token = cookieStore.get('session')?.value
	return createServerClient<Database>(
		env.NEXT_PUBLIC_SUPABASE_URL,
		serviceKey ?? env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			global: {
				headers: token
					? {
							Authorization: `Bearer ${token}`
					  }
					: undefined
			},
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value
				},
				set(name: string, value: string, options: CookieOptions) {
					cookieStore.set({ name, value, ...options })
				},
				remove(name: string, options: CookieOptions) {
					cookieStore.set({ name, value: '', ...options })
				}
			}
		}
	)
}
