import { getSession } from '@session'

import { getTranslations } from 'next-intl/server'
import { headers } from 'next/headers'
import MessageBox from '~/components/message-box'
import SignInButton from '~/components/sign-in-button'
import Background from '~/components/ui/background'
import Button from '~/components/ui/button'
import { verify } from './_actions/verify'
import VerifyButton from './_components/verify-button'

interface VerifyPageProps {
	searchParams: {
		status?: 'success' | 'error'
		message?: string
	}
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
	const session = await getSession()
	const t = await getTranslations('VerifyPage')
	const csrfToken = headers().get('X-CSRF-Token') ?? 'missing'
	const { status, message } = searchParams

	// this is pretty cringe... not going to fix tho :p
	return (
		<Background className='flex min-h-screen items-center justify-center'>
			<MessageBox
				title={t('title')}
				message={
					!session
						? t('Messages.signIn')
						: status === 'success'
						  ? t('Messages.verified')
						  : status === 'error'
							  ? `${message ?? t('Messages.defaultError')}`
							  : t('Messages.default')
				}
			>
				{!session ? (
					<SignInButton variant='outline' />
				) : status === 'error' ? (
					<Button href='/verify' variant='outline'>
						{t('Buttons.tryAgain')}
					</Button>
				) : (
					<form action={verify}>
						<input name='csrf_token' defaultValue={csrfToken} hidden />
						<VerifyButton
							text={t('Buttons.Verify.text')}
							loadingText={t('Buttons.Verify.loadingText')}
						/>
					</form>
				)}
			</MessageBox>
		</Background>
	)
}
