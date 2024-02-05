import { useTranslations } from 'next-intl'
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
	const t = useTranslations('UnauthorizedPage')
	const { type, message } = searchParams
	const authError = type === 'auth-error'

	return (
		<Background className='flex min-h-screen items-center justify-center'>
			<MessageBox
				title={authError ? t('authFailed') : t('unauthorized')}
				message={message ?? t('Messages.default')}
			>
				<Button href='/' variant='outline'>
					{t('homeButton')}
				</Button>
			</MessageBox>
		</Background>
	)
}
