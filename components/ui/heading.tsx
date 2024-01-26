import { cn } from '@utils/client'

interface HeadingProps {
	className?: string
	children: React.ReactNode
	sub?: boolean
	id?: string
	padding?: boolean
}

export default function Heading({
	className,
	children,
	sub,
	id,
	padding = true
}: HeadingProps) {
	return !sub ? (
		<h2
			id={id}
			className={cn(
				'padding grow text-3xl font-extrabold sm:text-5xl',
				className
			)}
		>
			{fancyHeader(children)}.
		</h2>
	) : (
		<h3
			id={id}
			className={cn(
				'text-lg font-extrabold sm:text-2xl',
				padding && 'padding',
				className
			)}
		>
			{fancyHeader(children)}
		</h3>
	)
}

function stringArray(children: React.ReactNode) {
	if (!children || typeof children === 'object') return ''
	return children.toString().split(' ')
}

function fancyHeader(children: React.ReactNode) {
	return stringArray(children).length < 2 ? (
		children
	) : (
		<>
			{stringArray(children)[0]}
			<span className='font-medium'>{` ${Array.from(stringArray(children))
				.slice(1)
				.join(' ')}`}</span>
		</>
	)
}
