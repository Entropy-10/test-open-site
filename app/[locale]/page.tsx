import { links } from '@siteConfig'
import pick from 'lodash/pick'
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import Background from '~/components/ui/Background'
import Button from '~/components/ui/Button'
import whiteLogo from '../../public/images/logo-white.png'

const Features = dynamic(() => import('./_components/features'))
const Originals = dynamic(() => import('./_components/originals'))

export default function Home() {
	const buttonT = useTranslations('Buttons')
	const t = useTranslations('HomePage')
	const messages = useMessages()

	return (
		<div>
			<Background fade>
				<div className='py-20'>
					<section className='relative flex items-center justify-center xl:justify-between xl:px-24'>
						<article className='sm:block'>
							<div className='flex flex-col items-center text-8xl leading-none md:flex-row md:space-x-7 lg:space-x-11 lg:text-[8.75rem]'>
								<span className='font-extrabold'>TEST</span>
								<div className='flex items-center space-x-4 lg:space-x-6'>
									<Image
										sizes='(max-width: 1024px) 80px, 130px'
										src={whiteLogo}
										alt='white logo'
										className='size-auto select-none'
									/>
									<span className='tracking-[1rem] lg:tracking-[1.5rem]'>
										PEN
									</span>
								</div>
							</div>

							<p className='mt-1 hidden font-light xl:block'>
								{t('Header.description')}
							</p>
						</article>

						<aside>
							<div className='text-right text-2xl font-extrabold'>
								<span className='hidden w-28 text-right xl:block'>
									{t('Header.hostTitle')}
								</span>
								<div className='absolute -top-[20px] right-0 hidden h-[2px] w-96 bg-milky-white md:block xl:top-[15px]' />
							</div>

							<div className='mt-9 hidden flex-col text-right font-light xl:flex'>
								<Link className='hover:underline' href={links.hosts.teddy}>
									TEDDY
								</Link>
								<Link className='hover:underline' href={links.hosts.entropy}>
									ENTROPY
								</Link>
								<Link className='hover:underline' href={links.hosts.sora}>
									SORA
								</Link>
							</div>
						</aside>
					</section>

					<div className='mt-5 hidden md:block'>
						<div className='h-[2px] w-96 bg-milky-white' />
						<div className='ml-12 mt-2 h-[5px] w-9 bg-milky-white' />
					</div>

					<div className='mt-5 flex w-full items-center justify-center xl:mt-0'>
						<Button variant='outline' href='/register'>
							{buttonT('register')}
						</Button>
					</div>
				</div>
			</Background>

			<div className='w-full space-y-20 overflow-x-hidden'>
				<NextIntlClientProvider messages={pick(messages, 'HomePage.Features')}>
					<Features />
				</NextIntlClientProvider>

				<Originals />
			</div>
		</div>
	)
}
