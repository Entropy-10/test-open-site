import { useTranslations } from 'next-intl'
import MessageBox from './message-box'
import Background from './ui/Background'

export default function ComingSoon() {
	const t = useTranslations('Components.ComingSoon')

	return (
		<Background className='flex min-h-screen items-center justify-center'>
			<MessageBox title={t('title')} message={t('message')} />
		</Background>
	)
}
