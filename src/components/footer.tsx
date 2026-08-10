import Image from "next/image"
import { Suspense } from "react"

import { cn } from "cnfast"
import { useTranslations } from "next-intl"

import whiteLogo from "../../public/images/logo-white.png"
import Status, { StatusSkeleton } from "./status"
import { NavLink } from "./ui/nav-link"
import { ChallongeIcon } from "~/components/icons/challonge"
import { DiscordIcon } from "~/components/icons/discord"
import { OsuIcon } from "~/components/icons/osu"
import { OsuBgIcon } from "~/components/icons/osu-bg"
import { TwitchIcon } from "~/components/icons/twitch"
import { XIcon } from "~/components/icons/x"
import { YoutubeIcon } from "~/components/icons/youtube"
import { Button } from "~/components/ui/button"
import { Link } from "~/i18n/navigation"
import { links, navlinks } from "~/utils/links"

export function Footer() {
  const buttonsT = useTranslations("Buttons")
  const navT = useTranslations("NavItems")
  const t = useTranslations("Footer")
  const { discord, x, twitch, youtube } = links.socials

  return (
    <footer className="bg-footer text-milky-white relative flex h-64 flex-col py-4">
      <div className="padding mt-4 flex flex-col space-y-5 md:space-y-0">
        <div className="hidden md:mb-5 md:flex">
          <Link href="/" className="cursor-pointer focus:outline-hidden">
            <h4 className="text-xl lg:text-2xl">
              <span className="font-extrabold">TEST</span> OPEN
            </h4>
          </Link>
        </div>

        <div className="flex justify-center md:justify-between">
          <p className="hidden max-w-75 text-xs md:block">{t("description")}</p>

          <div className="max-md:w-full max-md:max-w-lg">
            <nav className="divide-milky-white flex justify-between divide-x-2 text-xs font-medium select-none">
              {navlinks.map((item, i) => (
                <NavLink
                  key={item.text.toString()}
                  href={item.link}
                  className={cn(
                    "hover:text-medium-blue aria-[current=page]:text-medium-blue flex grow justify-center transition-colors aria-[current=page]:font-extrabold",
                    navlinks.length === i + 1 ? "md:pl-3" : "md:px-3"
                  )}
                >
                  {navT(item.text.toString())}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="order-first flex grow items-center justify-center md:order-0 md:justify-between">
          <Button
            className="hidden md:flex"
            nativeButton={false}
            render={<Link href="/register">{buttonsT("register")}</Link>}
          />

          <div className="mt-5 flex items-center space-x-5 *:cursor-pointer *:outline-hidden max-md:mt-0 md:justify-end">
            <Link target="_blank" href={discord}>
              <DiscordIcon className="hover:fill-[#5865F2]" />
            </Link>
            <Link target="_blank" href={x}>
              <XIcon className="hover:fill-[#000000]" />
            </Link>
            <Link target="_blank" href={twitch}>
              <TwitchIcon className="hover:fill-[#9146FF]" />
            </Link>
            <Link target="_blank" href={youtube}>
              <YoutubeIcon className="hover:fill-[#FF0000]" />
            </Link>
            <Link
              className="group relative h-7.5 w-7.5"
              target="_blank"
              href={links.forumPost}
            >
              <OsuIcon className="absolute z-10" />
              <OsuBgIcon className="absolute top-0 left-0 opacity-0 group-hover:opacity-100" />
            </Link>
            <Link target="_blank" href={links.challonge}>
              <ChallongeIcon className="hover:fill-[#FF7324]" />
            </Link>
          </div>
        </div>

        <div className="z-20 flex justify-center md:absolute md:right-12 md:bottom-1 md:-mr-2 md:justify-end lg:right-24">
          <Suspense fallback={<StatusSkeleton />}>
            <Status />
          </Suspense>
        </div>
      </div>

      <div className="absolute bottom-4 flex w-full items-center justify-center select-none">
        <div className="bg-milky-white h-0.75 w-full" />
        <Image src={whiteLogo} alt="logo" width={50} height={50} />
        <div className="bg-milky-white h-0.75 w-full" />
      </div>
    </footer>
  )
}
