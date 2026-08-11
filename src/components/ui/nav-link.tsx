"use client"

import { usePathname } from "next/navigation"
import { Suspense } from "react"
import type { Route } from "next"
import type { ComponentProps } from "react"

import cn from "cnfast"
import { motion } from "motion/react"

import { Link } from "~/i18n/navigation"

interface Props extends ComponentProps<typeof Link> {
  exact?: boolean
  underline?: boolean
}

function checkActive(pathname: string, href: string, exact?: boolean): boolean {
  if (exact || href === "/") return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavLinkShell({
  href,
  className,
  children,
  exact,
  isActive,
  underline = false,
  ...rest
}: Props & { isActive: boolean }) {
  return (
    <Link
      href={href as Route}
      aria-current={isActive ? "page" : undefined}
      className={cn("relative", className)}
      data-navlink-href={href.toString()}
      data-navlink-exact={exact || undefined}
      suppressHydrationWarning
      {...rest}
    >
      <>
        {children}
        {isActive && underline && (
          <motion.div
            layoutId="underline"
            transition={{ duration: 0.2 }}
            className="bg-light-blue absolute bottom-0 h-[2.5px] w-full"
          />
        )}
      </>
    </Link>
  )
}

function NavLinkInner(props: Props) {
  const pathname = usePathname()
  const isActive = checkActive(pathname, props.href.toString(), props.exact)
  return <NavLinkShell {...props} isActive={isActive} />
}

export function NavLink(props: Props) {
  return (
    <Suspense fallback={<NavLinkShell {...props} isActive={false} />}>
      <NavLinkInner {...props} />
    </Suspense>
  )
}
