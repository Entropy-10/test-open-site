"use client"

import { usePathname } from "next/navigation"
import { Suspense } from "react"
import type { Route } from "next"
import type { ReactNode } from "react"

import { Link } from "~/i18n/navigation"

interface RenderProps {
  isActive: boolean
}
type Renderable<T> = T | ((props: RenderProps) => T)

type Props<T extends string = string> = Omit<
  React.ComponentProps<typeof Link>,
  "href" | "className" | "children"
> & {
  href: Route<T> | URL
  className?: Renderable<string | undefined>
  children?: Renderable<React.ReactNode>
  exact?: boolean
}

function checkActive(pathname: string, href: string, exact?: boolean): boolean {
  if (exact || href === "/") return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

function resolve<T>(
  value: Renderable<T> | undefined,
  props: RenderProps
): T | undefined {
  return typeof value === "function"
    ? (value as (p: RenderProps) => T)(props)
    : value
}

export function NavLinkSkeleton({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span aria-hidden className={`text-gray opacity-50 ${className ?? ""}`}>
      {children}
    </span>
  )
}

function NavLinkShell<T extends string>({
  href,
  className,
  children,
  exact,
  isActive,
  ...rest
}: Props<T> & { isActive: boolean }) {
  return (
    <Link
      href={href as Route}
      aria-current={isActive ? "page" : undefined}
      className={resolve(className, { isActive })}
      data-navlink-href={href.toString()}
      data-navlink-exact={exact || undefined}
      suppressHydrationWarning
      {...rest}
    >
      {resolve(children, { isActive })}
    </Link>
  )
}

function NavLinkInner<T extends string>(props: Props<T>) {
  const pathname = usePathname()
  const isActive = checkActive(pathname, props.href.toString(), props.exact)
  return <NavLinkShell {...props} isActive={isActive} />
}

export function NavLink<T extends string>(props: Props<T>) {
  return (
    <Suspense fallback={<NavLinkShell {...props} isActive={false} />}>
      <NavLinkInner {...props} />
    </Suspense>
  )
}
