import { useTranslations } from 'next-intl'

export default function ComingSoon() {
	const t = useTranslations('Components')

	return (
		<div className='mt-48 flex justify-center'>
			<h1 className='font-bold text-3xl text-medium-blue italic'>
				{t('comingSoon')}
			</h1>
		</div>
	)
}
