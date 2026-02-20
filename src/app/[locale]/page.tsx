import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { links } from '@siteConfig'

import Background from '~/components/ui/background'
import Button from '~/components/ui/button'
import whiteLogo from '../../../public/images/logo-white.png'
import Features from './_components/features'
import Sponsor from './_components/sponsor'

const Originals = dynamic(() => import('./_components/originals'))

export default function Home() {
	const buttonT = useTranslations('Buttons')
	const t = useTranslations('HomePage')

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
										priority
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
							<div className='text-right font-extrabold text-2xl'>
								<span className='hidden w-28 text-right xl:block'>
									{t('Header.hostTitle')}
								</span>
								<div className='absolute -top-5 right-0 hidden h-0.5 w-96 bg-milky-white md:block xl:top-[15px]' />
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
						<div className='h-0.5 w-96 bg-milky-white' />
						<div className='mt-2 ml-12 h-[5px] w-9 bg-milky-white' />
					</div>

					<div className='mt-5 flex w-full items-center justify-center xl:mt-0'>
						<Button variant='outline' href='/register'>
							{buttonT('register')}
						</Button>
					</div>
				</div>
			</Background>

			<div className='flex w-full flex-col overflow-x-hidden'>
				<Features />
				<Originals />
				<Sponsor />
			</div>
		</div>
	)
}
