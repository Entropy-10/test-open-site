'use client'

import { features } from '@siteConfig'

import Feature from './feature'

export default function Features() {
	return (
		<section className='flex w-full flex-col justify-end space-y-5 text-milky-white'>
			{/* {!countdownComplete && <CountdownContainer />} */}
			<div className='flex flex-col-reverse space-y-5 space-y-reverse px-4 xl:order-first md:flex-row xl:justify-center md:justify-between md:space-x-5 md:space-y-0 md:px-12'>
				{features.map(({ name, link, className }) => {
					return (
						<Feature key={name} name={name} link={link} className={className} />
					)
				})}
			</div>
		</section>
	)
}
