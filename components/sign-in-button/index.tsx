'use client'

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
			<input name='return-path' defaultValue={pathname} hidden />
			<Button variant='primary' className={className}>
				SIGN IN
			</Button>
		</form>
	)
}
