'use client'

import { usePathname } from '@navigation'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import Button from '~/components/ui/button'
import { Content, Description, Root, Title } from '~/components/ui/modal'
import { reset } from '~/lib/actions'
import { CsrfInput } from './csrf-input'

interface ErrorModalProps {
	text: string
}

export default function ErrorModal({ text }: ErrorModalProps) {
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
		else setOpen(false)
	}, [title, message])

	return (
		<Root open={open} onOpenChange={setOpen}>
			<Content className='flex flex-col items-center justify-center'>
				<Title>{title}</Title>
				<Description className='text-center'>{message}</Description>

				<form action={reset}>
					<CsrfInput token={csrfToken} />
					<input name='pathname' defaultValue={pathname} hidden />
					<Button variant='outline'>{text}</Button>
				</form>
			</Content>
		</Root>
	)
}
