interface ListProps {
	children: React.ReactNode
}

export default function List({ children }: ListProps) {
	return (
		<ul className='padding list-inside list-disc font-medium text-sm leading-6 sm:text-base sm:leading-8'>
			{children}
		</ul>
	)
}
