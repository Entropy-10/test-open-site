import { env } from '@env'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

import type { CookieOptions } from '@supabase/ssr'
import type { NextRequest } from 'next/server'
import type { Database } from '~/types/supabase'

export const createClient = (request: NextRequest) => {
	let response = NextResponse.next({
		request: { headers: request.headers }
	})

	const supabase = createServerClient<Database>(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			global: {
				headers: {
					Authorization: `Bearer ${request.cookies.get('session')?.value}`
				}
			},
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value
				},
				set(name: string, value: string, options: CookieOptions) {
					request.cookies.set({ name, value, ...options })
					response = NextResponse.next({
						request: { headers: request.headers }
					})
					response.cookies.set({ name, value, ...options })
				},
				remove(name: string, options: CookieOptions) {
					request.cookies.set({ name, value: '', ...options })
					response = NextResponse.next({
						request: { headers: request.headers }
					})
					response.cookies.set({ name, value: '', ...options })
				}
			}
		}
	)

	return { supabase, response }
}
