'use client'

import { useTranslations } from 'next-intl'
import type { VariantProps } from 'class-variance-authority'

import Button, { type buttonVariants } from '../ui/button'
import { signIn } from './actions'

interface SignInButtonProps extends VariantProps<typeof buttonVariants> {
	className?: string
}

export default function SignInButton({
	className,
	variant
}: SignInButtonProps) {
	const t = useTranslations('Buttons')

	return (
		<Button
			onClick={() => signIn()}
			variant={variant ?? 'primary'}
			className={className}
		>
			{t('signIn')}
		</Button>
	)
}
