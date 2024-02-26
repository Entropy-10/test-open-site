'use client'

import { usePathname } from '@navigation'
import { cn } from '@utils/client'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'

import useAnimatedRouter from '~/hooks/useAnimatedRouter'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	link: string
	children: ReactNode
	underline?: boolean
	className?: string
	activeClassName?: string
}

const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
	(
		{ link, children, underline, className, activeClassName, ...props },
		forwardedRef
	) => {
		const router = useAnimatedRouter()
		const pathname = usePathname()
		const currentPath = pathname === link.toLowerCase()

		return (
			<a
				href={link}
				onClick={() => router(link)}
				ref={forwardedRef}
				className={cn(
					'relative select-none text-left transition-colors hover:text-light-blue focus:outline-none',
					className,
					currentPath && cn('font-extrabold text-light-blue', activeClassName)
				)}
				{...props}
			>
				{children}
				{currentPath && underline ? (
					<motion.div
						layoutId='underline'
						transition={{ duration: 0.2 }}
						className={cn(
							'absolute bottom-0 h-[2.5px] w-full bg-light-blue',
							activeClassName
						)}
					/>
				) : null}
			</a>
		)
	}
)

NavItem.displayName = 'NavItem'

export default NavItem
