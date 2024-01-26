import NextLink from 'next/link'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string
	newTab?: boolean
}

export default function Link({ href, children, newTab = true }: LinkProps) {
	return (
		<NextLink
			className='underline'
			href={href}
			target={newTab ? '_blank' : undefined}
		>
			{children}
		</NextLink>
	)
}
