import { createMetadata } from '@metadata'
import { getTranslations } from 'next-intl/server'

import Background from '~/components/ui/Background'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'

import type { MetadataProps } from '@types'
import { useTranslations } from 'next-intl'
import { CustomMDX } from './_components/custom-mdx'
import MappoolTable from './_components/mapool-table'

export async function generateMetadata({ params: { locale } }: MetadataProps) {
	const t = await getTranslations({ locale, namespace: 'Metadata' })
	return createMetadata({
		locale,
		title: t('PageTitles.info'),
		description: t('description')
	})
}

export default function InfoPage() {
	const t = useTranslations('InfoPage')
	return (
		<div>
			<Background className='py-10' imageClassName='brightness-95'>
				<Heading>{t('GeneralInfo.heading')}</Heading>
				<Divider />

				<CustomMDX
					source={`
- ${t('GeneralInfo.1')}
- ${t('GeneralInfo.2')}
- ${t('GeneralInfo.3')}
- ${t('GeneralInfo.4')}
- ${t('GeneralInfo.5')}
- ${t('GeneralInfo.6')}
- ${t('GeneralInfo.7')}
- ${t('GeneralInfo.8')}
- ${t('GeneralInfo.9', { sublist_alpha: '\n1.' })}
					`}
				/>
			</Background>

			<Background className='py-10 text-light-blue' gradient={false}>
				<Heading>{t('Registrations.heading')}</Heading>
				<Divider className='bg-light-blue' />
				<div className='text-blue'>
					<CustomMDX
						source={`
- ${t('Registrations.1')}
- ${t('Registrations.2')}
- ${t('Registrations.3')}
- ${t('Registrations.4')}
- ${t('Registrations.5')}
					`}
					/>
				</div>
			</Background>

			<Background className='py-10' imageClassName='brightness-95'>
				<Heading>{t('GeneralConduct.heading')}</Heading>
				<Divider />
				<CustomMDX
					source={`
- ${t('GeneralConduct.1')}
- ${t('GeneralConduct.2', { sublist_alpha: '\n1.' })}
- ${t('GeneralConduct.3')}
- ${t('GeneralConduct.4', { sublist_alpha: '\n1.' })}
- ${t('GeneralConduct.5')}
- ${t('GeneralConduct.6')}
- ${t('GeneralConduct.7')}
- ${t('GeneralConduct.8')}
- ${t('GeneralConduct.9')}
- ${t('GeneralConduct.10')}
- ${t('GeneralConduct.11')}
					`}
				/>
			</Background>

			<Background className='py-10 text-light-blue' gradient={false}>
				<Heading>{t('Scheduling.heading')}</Heading>
				<Divider className='bg-light-blue' />
				<div className='text-blue'>
					<CustomMDX
						source={`
- ${t('Scheduling.1')}
- ${t('Scheduling.2')}
- ${t('Scheduling.3')}
- ${t('Scheduling.4')}
					`}
					/>
				</div>
			</Background>

			<Background className='py-10' imageClassName='brightness-95'>
				<Heading>{t('GameProcedures.heading')}</Heading>
				<Divider />
				<CustomMDX
					source={`
- ${t('GameProcedures.1')}
- ${t('GameProcedures.2')}
- ${t('GameProcedures.3', { sublist_alpha: '\n1.' })}
- ${t('GameProcedures.4')}
					`}
				/>

				<Divider variant='single' />

				<Heading sub>{t('GameProcedures.Qualifiers.heading')}</Heading>
				<div className='px-7 lg:px-11 md:px-9'>
					<CustomMDX
						source={`
- ${t('GameProcedures.Qualifiers.1')}
- ${t('GameProcedures.Qualifiers.2', { sublist_alpha: '\n1.' })}
- ${t('GameProcedures.Qualifiers.3')}
					`}
					/>
				</div>

				<Divider variant='single' />

				<Heading sub>{t('GameProcedures.Match.heading')}</Heading>
				<div className='px-7 lg:px-11 md:px-9'>
					<CustomMDX
						source={`
- ${t('GameProcedures.Match.1')}
- ${t('GameProcedures.Match.2')}
- ${t('GameProcedures.Match.3', { sublist_alpha: '\n1.' })}
- ${t('GameProcedures.Match.4', { sublist_alpha: '\n1.' })}
- ${t('GameProcedures.Match.5', { sublist_alpha: '\n1.' })}
- ${t('GameProcedures.Match.6', { sublist_alpha: '\n1.' })}
- ${t('GameProcedures.Match.7')}
- ${t('GameProcedures.Match.8', { sublist_alpha: '\n1.' })}
- ${t('GameProcedures.Match.9')}
- ${t('GameProcedures.Match.10')}
- ${t('GameProcedures.Match.11')}
- ${t('GameProcedures.Match.12')}
- ${t('GameProcedures.Match.13')}
- ${t('GameProcedures.Match.14')}
					`}
					/>
				</div>
			</Background>

			<Background className='py-10 text-light-blue' gradient={false}>
				<Heading>{t('MappoolInfo.heading')}</Heading>
				<Divider className='bg-light-blue' />

				<div className='padding mb-5 overflow-x-scroll'>
					<MappoolTable />
				</div>

				<div className='text-blue'>
					<CustomMDX
						source={`
- ${t('MappoolInfo.1')}
- ${t('MappoolInfo.2')}
					`}
					/>
				</div>
			</Background>

			<Background className='py-10' imageClassName='brightness-95'>
				<Heading>{t('PrizePool.heading')}</Heading>
				<Divider />
				<CustomMDX
					source={`
- ${t('PrizePool.1', { sublist_alpha: '\n1.' })}
- ${t('PrizePool.2', { sublist_alpha: '\n1.' })}
- ${t('PrizePool.3', { sublist_alpha: '\n1.' })}
- ${t('PrizePool.4', { sublist_alpha: '\n1.' })}
					`}
				/>
			</Background>
		</div>
	)
}
