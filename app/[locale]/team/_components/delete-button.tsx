'use client'

import { useFormStatus } from 'react-dom'

import Button from '~/components/ui/Button'

export default function DeleteButton() {
	const { pending } = useFormStatus()

	return (
		<Button className='w-full' loading={pending}>
			DELETE INVITE
		</Button>
	)
}
