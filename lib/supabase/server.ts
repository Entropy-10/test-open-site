/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { env } from '@env'
import { createServerClient } from '@supabase/ssr'

import type { CookieOptions } from '@supabase/ssr'
import type { Database } from '~/types/supabase'
import type { cookies } from 'next/headers'

export const createClient = (
  cookieStore: ReturnType<typeof cookies>,
  serviceKey?: string
) => {
  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    serviceKey ?? env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
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
