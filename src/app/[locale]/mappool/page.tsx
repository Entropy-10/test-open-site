import { Suspense } from "react"

import { useTranslations } from "next-intl"
import * as v from "valibot"

import { Background } from "~/components/ui/background"
import { Divider } from "~/components/ui/divider"
import { Heading } from "~/components/ui/heading"
import { MappoolContainer } from "~/features/mappool/components/mappool-container"
import { RoundSchema } from "~/lib/db/schema"
import type { Round } from "~/lib/db/schema"

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

      <Suspense>
        {searchParams.then((sp) => (
          <MappoolContainer round={parseRound(sp.round)} />
        ))}
      </Suspense>
    </div>
  )
}
