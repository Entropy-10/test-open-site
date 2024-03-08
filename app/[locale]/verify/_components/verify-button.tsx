'use client'

import { useFormStatus } from 'react-dom'

import Button from '~/components/ui/button'

interface SubmitButtonProps {
	text: string
	loadingText: string
}

export default function SubmitButton({ text, loadingText }: SubmitButtonProps) {
	const { pending } = useFormStatus()

	return (
		<Button loading={pending} variant='outline'>
			{pending ? loadingText : text}
		</Button>
	)
}
