import { cn } from '@utils/client'

interface DividerProps {
	children?: React.ReactNode
	variant?: 'single' | 'double'
	className?: string
}

export default function Divider({
	children,
	variant,
	className
}: DividerProps) {
	return variant === 'single'
		? headerDivider({
				header: children,
				divider: (
					<div className='flex w-full flex-row-reverse py-5 pl-56'>
						<div className='max-w-[600px] flex-1'>
							<div className={cn('h-[2px] w-full bg-milky-white', className)} />
						</div>
					</div>
				)
		  })
		: headerDivider({
				header: children,
				divider: (
					<div className='col-start-1 py-3 lg:pr-20 md:pr-10'>
						<div className={cn('h-[2px] w-full bg-milky-white', className)} />
						<div
							className={cn('mt-2 ml-12 h-[5px] w-9 bg-milky-white', className)}
						/>
					</div>
				)
		  })
}

interface HeaderDividerProps {
	header: React.ReactNode
	divider: React.ReactNode
}

function headerDivider({ header, divider }: HeaderDividerProps) {
	return header ? (
		<div className='grid grid-cols-[max-content_1fr]'>
			{header}
			{divider}
		</div>
	) : (
		divider
	)
}
