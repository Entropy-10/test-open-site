import { cookies } from 'next/headers'

import { env } from '@env'
import { createServerClient } from '@supabase/ssr'

import type { Database } from '~/types/supabase'

export async function createClient() {
	const cookieStore = await cookies()

	return createServerClient<Database>(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll()
				},
				setAll(cookiesToSet) {
					for (const { name, value, options } of cookiesToSet) {
						cookieStore.set(name, value, options)
					}
				}
			}
		}
	)
}
