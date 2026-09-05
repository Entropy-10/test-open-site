import { Suspense } from "react"

import { useTranslations } from "next-intl"
import { getLocale, getTranslations } from "next-intl/server"

import { Background } from "~/components/ui/background"
import { Divider } from "~/components/ui/divider"
import { Heading } from "~/components/ui/heading"
import TeamList from "~/features/teams/components/team-list"
import { createMetadata } from "~/utils/metadata"

export async function generateMetadata() {
  const locale = await getLocale()

  const t = await getTranslations({ locale, namespace: "Metadata" })
  return createMetadata({
    locale,
    title: t("PageTitles.teams"),
    description: t("description")
  })
}

export default function TeamsPage() {
  const t = useTranslations("TeamsPage")

  return (
    <div>
      <Background className="py-8">
        <Heading>{t("heading")}</Heading>
        <Divider />
        <div className="padding text-xl">
          <span className="font-extrabold">{0}</span> {t("teamsRegistered")}
        </div>
      </Background>

      <Suspense>
        <TeamList />
      </Suspense>
    </div>
  )
}
