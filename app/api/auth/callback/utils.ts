import { NextResponse } from 'next/server'

export function authError(url: URL, message?: string) {
  return NextResponse.redirect(
    url.origin + `/error?message=${message ?? 'Failed to authenticate user'}`
  )
}
