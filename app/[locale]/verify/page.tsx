import { getSession } from '@utils/server'

import MessageBox from '~/components/message-box'
import SignInButton from '~/components/sign-in-button'
import Background from '~/components/ui/Background'
import Button from '~/components/ui/Button'
import { verify } from './_actions/verify'
import VerifyButton from './_components/verify-button'

interface VerifyPageProps {
	searchParams: {
		status?: 'success' | 'error'
		message?: string
	}
}

export default function VerifyPage({ searchParams }: VerifyPageProps) {
	const session = getSession()
	const { status, message } = searchParams

	// this is pretty cringe... not going to fix tho :p
	return (
		<Background className='flex min-h-screen items-center justify-center'>
			<MessageBox
				title='SERVER VERIFICATION'
				message={
					!session
						? 'Sign in first before attempting to verify.'
						: status === 'success'
						  ? 'Welcome to the TEST Open Discord server!'
						  : status === 'error'
							  ? `${message ?? 'Verification failed. Please try again later.'}`
							  : 'Please click the button below to gain access to the server.'
				}
			>
				{!session ? (
					<SignInButton variant='outline' />
				) : status === 'error' ? (
					<Button href='/verify' variant='outline'>
						TRY AGAIN
					</Button>
				) : (
					<form action={verify}>
						<VerifyButton />
					</form>
				)}
			</MessageBox>
		</Background>
	)
}
