'use client'

import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import MessageBox from '~/components/message-box'
import Background from '~/components/ui/background'

import Button from '~/components/ui/button'

interface ErrorProps {
	error: Error & { digest?: string }
	reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
	const t = useTranslations('ErrorPage')
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<Background className='flex min-h-screen items-center justify-center'>
			<MessageBox title={t('title')} message={t('message')}>
				<div className='flex gap-6 max-xs:grid max-xs:w-full max-xs:grid-cols-2'>
					<Button onClick={() => reset()} className='max-xs:w-full'>
						{t('retryButton')}
					</Button>

					<Button href='/' variant='outline' className='max-xs:w-full'>
						{t('goHomeButton')}
					</Button>
				</div>
			</MessageBox>
		</Background>
	)
}
