import { cn } from '@utils/client'

interface RadialProgressProps {
	className?: string
	progress: number
}

export default function RadialProgress({
	className,
	progress
}: RadialProgressProps) {
	return (
		<div className={cn('relative size-4', className)}>
			<svg
				className='size-full'
				width='36'
				height='36'
				viewBox='0 0 36 36'
				xmlns='http://www.w3.org/2000/svg'
			>
				<title>{progress}% progress</title>
				<circle
					cx='18'
					cy='18'
					r='16'
					fill='none'
					strokeWidth='5'
					className='stroke-current text-[#dddddd]'
				/>
				<g className='-rotate-90 origin-center transform'>
					<circle
						cx='18'
						cy='18'
						r='16'
						fill='none'
						strokeLinecap='round'
						strokeWidth='5'
						strokeDasharray='100'
						strokeDashoffset={100 - (progress / 100) * 100}
						className='stroke-current text-[#6dc271]'
					/>
				</g>
			</svg>
		</div>
	)
}
