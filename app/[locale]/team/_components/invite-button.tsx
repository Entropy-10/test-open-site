'use client'

import { useFormStatus } from 'react-dom'

import Button from '~/components/ui/Button'

interface InviteButtonProps {
	disabled: boolean
	text: string
}

export default function InviteButton({ disabled, text }: InviteButtonProps) {
	const { pending } = useFormStatus()

	return (
		<Button disabled={disabled} loading={pending} variant='invertedOutline'>
			{text}
		</Button>
	)
}
