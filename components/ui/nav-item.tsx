'use client'

import { usePathname } from '@navigation'
import { cn } from '@utils/client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { forwardRef } from 'react'

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
		const pathname = usePathname()
		const currentPath = pathname === link.toLowerCase()

		return (
			<Link
				href={link}
				ref={forwardedRef}
				className={cn(
					'relative select-none text-left transition-colors hover:cursor-pointer hover:text-light-blue focus:outline-none',
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
			</Link>
		)
	}
)

NavItem.displayName = 'NavItem'

export default NavItem
