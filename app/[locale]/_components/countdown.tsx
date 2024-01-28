'use client'

import { motion } from 'framer-motion'

import type { CountdownTime } from '@types'

interface CountdownProps {
	timeLeft: CountdownTime
}

export default function Countdown({ timeLeft }: CountdownProps) {
	const { days, hours, minutes, seconds } = timeLeft

	return (
		<div className='flex font-black text-4xl xl:w-full'>
			<CountdownNumber number={days} />:
			<CountdownNumber number={hours} />:
			<CountdownNumber number={minutes} />:
			<CountdownNumber number={seconds} />
		</div>
	)
}

function CountdownNumber({ number }: { number: string }) {
	return (
		<motion.div
			key={number}
			initial={{ y: -10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{
				ease: 'anticipate',
				duration: 0.7
			}}
		>
			{number}
		</motion.div>
	)
}
