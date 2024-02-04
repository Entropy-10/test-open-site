'use client'

import Button from '~/components/ui/Button'

export default function NotFound() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center space-y-4 text-medium-blue'>
			<h1 className='font-bold text-4xl'>Not Found</h1>
			<p className='text-lg'>Sorry, but this page seems to not exist?</p>
			<Button href='/' variant='invertedOutline'>
				Go Home
			</Button>
		</div>
	)
}
