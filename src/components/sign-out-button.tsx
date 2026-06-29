'use client'

import { cn } from '@utils/client'

import { signOut } from '~/lib/actions'

interface SignOutButtonProps {
	className?: string
	text: string
}

export default function SignOutButton({ className, text }: SignOutButtonProps) {
	return (
		<button
			className={cn('text-left text-red-400', className)}
			type='button'
			onClick={() => signOut()}
		>
			{text}
		</button>
	)
}
