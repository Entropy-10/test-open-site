"use client"

import { Suspense, ViewTransition } from "react"
import type { Route } from "next"
import type { ComponentProps } from "react"

import { cn } from "cnfast"

import { Link, usePathname } from "~/i18n/navigation"

interface Props extends ComponentProps<typeof Link> {
  exact?: boolean
  underline?: boolean
  indicatorName?: string
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
  indicatorName = "nav-link-indicator",
  ...rest
}: Props & { isActive: boolean }) {
  return (
    <Link
      href={href as Route}
      aria-current={isActive ? "page" : undefined}
      className={cn("relative", className)}
      data-navlink-href={href.toString()}
      data-navlink-exact={exact || undefined}
      prefetch
      {...rest}
    >
      <>
        {children}
        {isActive && underline && (
          <ViewTransition name={indicatorName} share="nav-underline">
            <div className="bg-light-blue absolute bottom-0 h-[2.5px] w-full" />
          </ViewTransition>
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
