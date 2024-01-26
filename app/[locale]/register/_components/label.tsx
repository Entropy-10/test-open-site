import { cn } from '@utils/client'

interface LabelProps {
	children: React.ReactNode
	className?: string
	htmlFor: string
}

export default function Label({ children, className, htmlFor }: LabelProps) {
	return (
		<label
			htmlFor={htmlFor}
			className={cn(
				'text-sm font-medium text-dark-blue group-focus-within:font-bold group-focus-within:text-light-blue',
				className
			)}
		>
			{children}
		</label>
	)
}
