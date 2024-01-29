'use client'

import { usePathname } from '@navigation'

import { VariantProps } from 'class-variance-authority'
import Button, { buttonVariants } from '../ui/Button'
import { signIn } from './actions'

interface SignInButtonProps extends VariantProps<typeof buttonVariants> {
	className?: string
}

export default function SignInButton({
	className,
	variant
}: SignInButtonProps) {
	const pathname = usePathname()

	return (
		<form action={signIn}>
			<input name='return-path' defaultValue={pathname} hidden />
			<Button variant={variant ?? 'primary'} className={className}>
				SIGN IN
			</Button>
		</form>
	)
}
