'use client'

import { motion } from 'motion/react'

import useSizeQuery from '~/hooks/use-size-query'
import Song from './song'

export default function Songs() {
	const smMatch = useSizeQuery('(min-width: 640px)')
	const xlMatch = useSizeQuery('(max-width: 1280px)')

	return (
		<div className='w-full'>
			<div className='relative mt-10 flex min-h-[120px] w-full items-center justify-start overflow-hidden pl-5 md:min-h-[180px] xl:mt-0 xl:max-h-[400px] xl:justify-end'>
				{xlMatch ? (
					<motion.div
						initial={{ x: 0 }}
						animate={{ x: smMatch ? -1400 : -980 }}
						transition={{
							repeat: Number.POSITIVE_INFINITY,
							duration: 15,
							ease: 'linear'
						}}
						className='absolute flex gap-5'
					>
						<SongsContainer />
						<SongsContainer />
					</motion.div>
				) : (
					<SongsContainer />
				)}
			</div>
		</div>
	)
}

function SongsContainer() {
	return (
		<div className='flex space-x-5 xl:block xl:rotate-[-20deg] xl:space-x-0 xl:space-y-5'>
			<div className='flex space-x-5 xl:justify-center'>
				<Song song='album' />
				<Song song='fractal' />
			</div>

			<div className='flex space-x-5'>
				<Song song='fermion' />
				<Song song='twilight' />
				<Song song='cyber' />
			</div>

			<div className='flex space-x-5 xl:justify-center'>
				<Song song='phoenix' />
				<Song temp />
			</div>
		</div>
	)
}
