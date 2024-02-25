'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export default function SponsorCode() {
	const [success, setSuccess] = useState(false)

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText('TEST')
			setSuccess(true)
			setTimeout(() => setSuccess(false), 800)
		} catch (error) {
			setSuccess(false)
		}
	}

	return (
		<button
			type='button'
			onClick={() => copyToClipboard()}
			className='group relative border border-dashed px-6 font-black text-dark-blue focus:outline-none'
		>
			TEST
			{!success && (
				<Copy
					size={12}
					strokeWidth={3}
					className='absolute top-1 right-1 z-20 opacity-0 transition-all duration-100 group-hover:opacity-100'
				/>
			)}
			<AnimatePresence>
				{success && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Check
							size={12}
							strokeWidth={3}
							className='absolute top-1 right-1 z-20'
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</button>
	)
}
