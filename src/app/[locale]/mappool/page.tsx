import { Suspense } from "react"

import { useTranslations } from "next-intl"
import { getLocale, getTranslations } from "next-intl/server"
import * as v from "valibot"

import { Background } from "~/components/ui/background"
import { Divider } from "~/components/ui/divider"
import { Heading } from "~/components/ui/heading"
import { MappoolSkeleton } from "~/features/mappool/components/mappool"
import { MappoolContainer } from "~/features/mappool/components/mappool-container"
import { RoundSchema } from "~/lib/db/schema"
import { createMetadata } from "~/utils/metadata"
import type { Round } from "~/lib/db/schema"

export async function generateMetadata() {
  const locale = await getLocale()

  const t = await getTranslations({ locale, namespace: "Metadata" })
  return createMetadata({
    locale,
    title: t("PageTitles.mappool"),
    description: t("description")
  })
}

function parseRound(value: string | string[] | undefined): Round {
  const round = v.safeParse(RoundSchema, value)
  return round.success ? round.output : "grand_finals"
}

export default function MappoolPage({
  searchParams
}: PageProps<"/[locale]/mappool">) {
  const t = useTranslations("MappoolPage")

  return (
    <div className="relative">
      <Background className="py-8">
        <Heading>{t("heading")}</Heading>
        <Divider className="max-w-[180px] sm:max-w-[280px] md:max-w-[310px] lg:max-w-[360px]" />
      </Background>

      <Suspense fallback={<MappoolSkeleton />}>
        {searchParams.then((sp) => (
          <MappoolContainer round={parseRound(sp.round)} />
        ))}
      </Suspense>
    </div>
  )
}
