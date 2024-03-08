import { links, songs } from '@siteConfig'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import Button from '~/components/ui/button'
import Songs from './songs'

export default function Originals() {
	const t = useTranslations('HomePage.Originals')

	return (
		<section className='mt-10 flex flex-col items-center pb-10 text-light-blue xl:flex-row xl:justify-between xl:pb-0'>
			<div className='flex flex-col px-4 md:mr-10 md:flex-row lg:justify-normal md:justify-between lg:space-x-12 md:pl-12 xl:pl-24'>
				<article className='lg:min-w-[450px] md:min-w-[400px]'>
					<h3 className='mb-2 text-center font-extrabold text-4xl md:text-left lg:text-6xl sm:text-5xl'>
						TEST Originals
					</h3>
					<div className='text-center font-medium text-md md:text-left lg:text-xl sm:text-lg'>
						{t('subtitle')}
					</div>

					<div className='mt-7 flex flex-col items-center border-light-blue md:ml-10 md:items-baseline md:border-l-2 md:py-1 md:pl-4'>
						<p className='mb-3 w-[330px] text-center font-medium text-blue text-sm leading-6 md:text-left max-sm:text-xs'>
							{t('description')}
						</p>

						<Button variant='invertedOutline' href={links.album}>
							{t('listenButton')}
						</Button>
					</div>
				</article>

				<article className='hidden min-w-[320px] md:block'>
					<h3 className='mt-10 font-medium lg:text-2xl sm:text-xl'>
						{t('tracksTitle')}
					</h3>

					<ol className='mt-4 ml-10 list-inside list-[decimal-leading-zero] space-y-3 border-light-blue border-l-2 py-1 pl-4 font-medium text-blue text-sm marker:font-bold'>
						{songs.map(({ name, artist, link, id }) => (
							<li key={id}>
								<Link
									href={link}
									target='_blank'
									className='hover:underline focus:outline-none'
								>
									{name} by {artist}
								</Link>
							</li>
						))}
					</ol>
				</article>
			</div>

			<Songs />
		</section>
	)
}
