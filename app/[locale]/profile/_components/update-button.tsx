'use client'

import { useFormStatus } from 'react-dom'

import Button from '~/components/ui/Button'

interface UpdateButtonProps {
	text: string
	loadingText: string
}

export default function UpdateButton({ text, loadingText }: UpdateButtonProps) {
	const { pending } = useFormStatus()

	return (
		<Button loading={pending} className='w-full'>
			{pending ? loadingText : text}
		</Button>
	)
}
