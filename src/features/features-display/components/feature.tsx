import { cn } from "cnfast"
import { useTranslations } from "next-intl"

import { ClickArrowIcon } from "~/components/icons/click-arrow"
import { FormatIcon } from "~/components/icons/format"
import { ScheduleIcon } from "~/components/icons/schedule"
import { Link } from "~/i18n/navigation"
import type { Feature as FeatureProps } from "../features-info"

const featureConfig = {
  mappool: {
    icon: <FormatIcon className="size-12 md:size-14" />,
    bgColor: "bg-light-blue"
  },
  format: {
    icon: <FormatIcon className="size-12 md:size-14" />,
    bgColor: "bg-feature2"
  },
  schedule: {
    icon: <ScheduleIcon className="size-12 md:size-14" />,
    bgColor: "bg-lavender"
  }
}

export function Feature({ name, link }: FeatureProps) {
  const titlesT = useTranslations("HomePage.Features.Titles")
  const descriptionsT = useTranslations("HomePage.Features.Descriptions")
  const { icon, bgColor } = featureConfig[name]

  return (
    <div
      className={cn(
        "relative flex w-full space-x-5 py-5 pl-5 md:h-28 md:items-center md:px-5 md:py-0 xl:max-w-[400px] xl:justify-center",
        bgColor
      )}
    >
      {icon}
      <div className="max-w-[168px]">
        <h2 className="text-sm font-bold tracking-wider">{titlesT(name)}</h2>
        <p className="text-xs">{descriptionsT(name)}</p>
      </div>

      <Link href={link}>
        <ClickArrowIcon className="absolute right-3 md:hidden" />
      </Link>
    </div>
  )
}
