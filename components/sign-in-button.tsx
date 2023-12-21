'use client'

import Button from './ui/Button'

interface SignInButtonProps {
  className?: string
}

export default function SignInButton({ className }: SignInButtonProps) {
  return (
    <Button variant='primary' className={className}>
      SIGN IN
    </Button>
  )
}
