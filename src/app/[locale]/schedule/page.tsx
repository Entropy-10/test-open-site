import { Suspense } from "react"

import { useTranslations } from "next-intl"
import { getLocale, getTranslations } from "next-intl/server"

import { Background } from "~/components/ui/background"
import { Divider } from "~/components/ui/divider"
import { Heading } from "~/components/ui/heading"
import {
  Schedule,
  ScheduleSkeleton
} from "~/features/schedule/components/schedule"
import { createMetadata } from "~/utils/metadata"

export async function generateMetadata() {
  const locale = await getLocale()

  const t = await getTranslations({ locale, namespace: "Metadata" })
  return createMetadata({
    locale,
    title: t("PageTitles.schedule"),
    description: t("description")
  })
}

export default function SchedulePage() {
  const t = useTranslations("SchedulePage")

  return (
    <div className="relative">
      <Background className="py-8">
        <Heading>{t("heading")}</Heading>
        <Divider className="max-w-[190px] sm:max-w-[290px] md:max-w-[320px] lg:max-w-[370px]" />
      </Background>

      <Suspense fallback={<ScheduleSkeleton />}>
        <Schedule />
      </Suspense>
    </div>
  )
}
