'use client'

import { getBaseUrl } from '@utils/client'
import { usePathname } from '@navigation'

import Button from '../ui/Button'
import { signIn } from './actions'

interface SignInButtonProps {
  className?: string
}

export default function SignInButton({ className }: SignInButtonProps) {
  const pathname = usePathname()

  return (
    <form action={signIn}>
      <input name='return-url' defaultValue={getBaseUrl() + pathname} hidden />
      <Button variant='primary' className={className}>
        SIGN IN
      </Button>
    </form>
  )
}
