import MessageBox from '~/components/message-box'
import Background from '~/components/ui/Background'
import Button from '~/components/ui/Button'

interface UnauthorizedPageProps {
	searchParams: {
		type: 'auth-error'
		message?: string
	}
}

export default function UnauthorizedPage({
	searchParams
}: UnauthorizedPageProps) {
	const { type, message } = searchParams
	const authError = type === 'auth-error'

	return (
		<Background className='flex min-h-screen items-center justify-center'>
			<MessageBox
				title={authError ? 'AUTHORIZATION FAILED!' : 'UNAUTHORIZED!'}
				message={message ?? 'Please sign in first before accessing this page.'}
			>
				<Button href='/' variant='outline'>
					HOME
				</Button>
			</MessageBox>
		</Background>
	)
}
