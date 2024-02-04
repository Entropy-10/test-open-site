'use client'

import { useFormStatus } from 'react-dom'

import Button from '~/components/ui/Button'

interface InviteButtonProps {
	disabled: boolean
}

export default function InviteButton({ disabled }: InviteButtonProps) {
	const { pending } = useFormStatus()

	return (
		<Button disabled={disabled} loading={pending} variant='invertedOutline'>
			INVITE
		</Button>
	)
}
