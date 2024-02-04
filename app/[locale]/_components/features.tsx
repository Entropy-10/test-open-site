'use client'

import { features } from '@siteConfig'
import { LayoutGroup, motion } from 'framer-motion'

import CountdownContainer from './countdown-container'
import Feature from './feature'

export default function Features() {
	return (
		<section className='flex w-full flex-col justify-end space-y-5 text-milky-white xl:flex-row xl:space-y-0'>
			<LayoutGroup>
				<CountdownContainer />
				<motion.div
					layout
					initial={{ x: 300, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ ease: 'easeInOut', duration: 0.4 }}
					className='flex flex-col-reverse space-y-5 space-y-reverse px-4 xl:order-first xl:mr-5 md:flex-row xl:justify-end md:justify-between md:space-x-5 md:space-y-0 md:px-12 xl:pr-0 xl:pl-24'
				>
					{features.map(({ name, link, className }) => {
						return (
							<Feature
								key={name}
								name={name}
								link={link}
								className={className}
							/>
						)
					})}
				</motion.div>
			</LayoutGroup>
		</section>
	)
}
