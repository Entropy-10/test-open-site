import Image from "next/image"

import { getTranslations } from "next-intl/server"

import whiteLogo from "../../../public/images/logo-white.png"
import { Background } from "~/components/ui/background"
import { Button } from "~/components/ui/button"
import { Link } from "~/i18n/navigation"
import { links } from "~/utils/links"

export default async function HomePage() {
  const [homePageT, buttonsT] = await Promise.all([
    getTranslations("HomePage"),
    getTranslations("Buttons")
  ])

  return (
    <div>
      <Background fade>
        <div className="py-20">
          <section className="relative flex items-center justify-center xl:justify-between xl:px-24">
            <article className="sm:block">
              <div className="flex flex-col items-center text-8xl leading-none md:flex-row md:space-x-7 lg:space-x-11 lg:text-[8.75rem]">
                <span className="font-extrabold">TEST</span>
                <div className="flex items-center space-x-4 lg:space-x-6">
                  <Image
                    sizes="(max-width: 1024px) 80px, 130px"
                    src={whiteLogo}
                    alt="white logo"
                    className="size-auto select-none"
                    priority
                  />
                  <span className="tracking-[1rem] lg:tracking-[1.5rem]">
                    PEN
                  </span>
                </div>
              </div>

              <p className="mt-1 hidden font-light xl:block">
                {homePageT("Header.description")}
              </p>
            </article>

            <aside>
              <div className="text-right text-2xl font-extrabold">
                <span className="hidden w-28 text-right xl:block">
                  {homePageT("Header.hostTitle")}
                </span>
                <div className="bg-milky-white absolute -top-5 right-0 hidden h-0.5 w-96 md:block xl:top-3.75" />
              </div>

              <div className="mt-9 hidden flex-col text-right font-light xl:flex">
                <Link className="hover:underline" href={links.hosts.teddy}>
                  TEDDY
                </Link>
                <Link className="hover:underline" href={links.hosts.entropy}>
                  ENTROPY
                </Link>
                <Link className="hover:underline" href={links.hosts.sora}>
                  SORA
                </Link>
              </div>
            </aside>
          </section>

          <div className="mt-5 hidden md:block">
            <div className="bg-milky-white h-0.5 w-96" />
            <div className="bg-milky-white mt-2 ml-12 h-1.25 w-9" />
          </div>

          <div className="mt-5 flex w-full items-center justify-center xl:mt-0">
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/register">{buttonsT("register")}</Link>}
            />
          </div>
        </div>
      </Background>

      <div className="flex w-full flex-col overflow-x-hidden" />
    </div>
  )
}
