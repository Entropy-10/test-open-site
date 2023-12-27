'use client'

import { forwardRef } from 'react'
import { cn } from '@utils/client'
import { motion } from 'framer-motion'
import { usePathname } from '@navigation'

import useAnimatedRouter from '~/hooks/useAnimatedRouter'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface NavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  link: string
  children: ReactNode
  underline?: boolean
  className?: string
  activeClassName?: string
}

const NavItem = forwardRef<HTMLButtonElement, NavItemProps>(
  (
    { link, children, underline, className, activeClassName, ...props },
    forwardedRef
  ) => {
    const router = useAnimatedRouter()
    const pathname = usePathname()
    const currentPath = pathname === link.toLowerCase()

    return (
      <button
        onClick={() => router(link)}
        ref={forwardedRef}
        className={cn(
          'relative select-none text-left transition-colors hover:text-light-blue',
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
      </button>
    )
  }
)

NavItem.displayName = 'NavItem'

export default NavItem
