'use client'

import useAnimatedRouter from '~/hooks/useAnimatedRouter'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string
	locale?: string
	children: ReactNode
}

export default function Link({ href, children, locale, ...props }: LinkProps) {
	const animatedRoute = useAnimatedRouter()

	return (
		<a
			onClick={() => {
				animatedRoute(href, locale)
			}}
			{...props}
		>
			{children}
		</a>
	)
}
