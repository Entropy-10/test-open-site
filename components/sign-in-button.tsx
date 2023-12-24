'use client'

import { env } from '@env'
import { buildUrl } from 'osu-web.js'

import Button from './ui/Button'

interface SignInButtonProps {
  className?: string
}

export default function SignInButton({ className }: SignInButtonProps) {
  const osuAuthUrl = buildUrl.authRequest(
    env.NEXT_PUBLIC_OSU_CLIENT_ID,
    env.NEXT_PUBLIC_OSU_REDIRECT_URI,
    ['identify', 'public']
  )

  return (
    <Button href={osuAuthUrl} variant='primary' className={className}>
      SIGN IN
    </Button>
  )
}
