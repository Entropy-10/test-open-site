import { Suspense } from "react"

import { useTranslations } from "next-intl"

import { MobileNav } from "./mobile-nav"
import { NavLink } from "./ui/nav-link"
import { LogoIcon } from "~/components/icons/logo"
import { LanguagePickerSkeleton } from "~/features/language/components/language-picker"
import { LanguageWrapper } from "~/features/language/components/language-wrapper"
import { Link } from "~/i18n/navigation"
import { navLinks } from "~/utils/links"

export function Header() {
  const t = useTranslations("NavItems")

  return (
    <header className="bg-milky-white h-14">
      <section className="padding flex h-full grow items-center justify-between">
        <Link
          href="/"
          className="flex cursor-pointer items-center space-x-2 focus:outline-hidden"
        >
          <LogoIcon h={38} w={44} className="h-[38px] w-11" />
          <h1 className="text-xl">
            <span className="font-black">TEST</span> OPEN
          </h1>
        </Link>

        <nav className="hidden h-full gap-4 px-4 text-center text-xs font-semibold min-[925px]:gap-8 md:flex">
          {navLinks.map(({ link, text }) => (
            <NavLink
              key={text}
              href={link}
              underline={true}
              indicatorName="main-nav-indicator"
              className="hover:text-light-blue aria-[current=page]:text-light-blue flex items-center justify-center aria-[current=page]:font-extrabold"
            >
              {t(text)}
            </NavLink>
          ))}
        </nav>

        <div className="flex gap-3">
          <Suspense fallback={<LanguagePickerSkeleton />}>
            <LanguageWrapper />
          </Suspense>

          <MobileNav />
        </div>
      </section>
    </header>
  )
}
