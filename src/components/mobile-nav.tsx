import { MenuIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import {
  Dropdown,
  DropdownContent,
  DropdownLinkItem,
  DropdownTrigger
} from "./ui/dropdown"
import { NavLink } from "./ui/nav-link"
import { navLinks } from "~/utils/links"

export function MobileNav() {
  const t = useTranslations("NavItems")

  return (
    <nav className="md:hidden">
      <Dropdown>
        <DropdownTrigger className="from-light-blue to-salmon text-milky-white relative flex items-center justify-between gap-1 bg-linear-to-r from-[-100%] px-1 py-0.5 focus:outline-hidden">
          <MenuIcon />
        </DropdownTrigger>

        <DropdownContent>
          {navLinks.map(({ link, text }) => (
            <DropdownLinkItem
              key={text}
              className="aria-[current=page]:bg-light-blue aria-[current=page]:text-milky-white aria-[current=page]:font-extrabold"
              render={<NavLink href={link} />}
            >
              {t(text)}
            </DropdownLinkItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </nav>
  )
}
