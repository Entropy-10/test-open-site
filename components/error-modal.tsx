'use client'

import { usePathname } from '@navigation'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import Button from '~/components/ui/Button'
import { Content, Description, Root, Title } from '~/components/ui/modal'
import { reset } from '~/lib/actions'

export default function ErrorModal() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const title = searchParams.get('title')
	const message = searchParams.get('message')
	const [open, setOpen] = useState(false)
	const [csrfToken, setCsrfToken] = useState<string>('loading...')

	useEffect(() => {
		const el = document.querySelector(
			'meta[name="x-csrf-token"]'
		) as HTMLMetaElement | null
		if (el) setCsrfToken(el.content)
		else setCsrfToken('missing')
	}, [])

	useEffect(() => {
		if (title && message) setOpen(true)
	}, [title, message])

	return (
		<Root open={open} onOpenChange={setOpen}>
			<Content className='flex flex-col items-center justify-center'>
				<Title>{title}</Title>
				<Description className='text-center'>{message}</Description>

				<form action={reset}>
					<input name='csrf_token' defaultValue={csrfToken} hidden />
					<input name='pathname' defaultValue={pathname} hidden />
					<Button variant='outline'>CLOSE</Button>
				</form>
			</Content>
		</Root>
	)
}
