'use client'

import { useFormStatus } from 'react-dom'

import Button from '~/components/ui/Button'

interface DeleteButtonProps {
	text: string
}

export default function DeleteButton({ text }: DeleteButtonProps) {
	const { pending } = useFormStatus()

	return (
		<Button className='w-full' loading={pending}>
			{text}
		</Button>
	)
}
