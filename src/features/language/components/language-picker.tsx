"use client"

import Image from "next/image"

import { cn } from "cn"
import { useLocale } from "next-intl"

import { ChevronDownIcon } from "~/components/icons/chevron-down"
import { RadialProgress } from "~/components/ui/radial-progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "~/components/ui/select"
import { localesMetadata } from "~/i18n/locales"
import { Link, usePathname } from "~/i18n/navigation"

interface LanguagePickerProps {
  progress: { code: string; progress: number }[] | null
}

export function LanguagePicker({ progress }: LanguagePickerProps) {
  const pathname = usePathname()
  const locale = useLocale()

  return (
    <Select>
      <SelectTrigger className="group flex w-12 items-center justify-between select-none focus:outline-hidden">
        <Image
          width={20}
          height={15}
          alt={locale}
          src={`/flags/${locale}.svg`}
          className="h-[15px] w-5 drop-shadow-[0.5px_0.5px_0.5px_rgba(0,0,0,0.25)]"
        />
        <ChevronDownIcon
          className="size-6 transition-all duration-300 group-data-[state=open]:rotate-180"
          pathClassName="stroke-medium-blue"
        />
      </SelectTrigger>

      <SelectContent className="w-48">
        {localesMetadata.map(({ code, editorCode, flag, name }) => {
          const langProgress = progress?.find(
            (lang) => lang.code === (editorCode ?? code)
          )?.progress

          return (
            <SelectItem key={code} className="p-0">
              <Link
                href={pathname}
                locale={code}
                className={cn(
                  "flex h-full w-full cursor-pointer items-center justify-between px-3 py-0.5 select-none focus:outline-hidden",
                  locale === code && "bg-light-blue text-milky-white font-bold"
                )}
              >
                <div className="flex items-center">
                  <Image
                    width={16}
                    height={12}
                    alt={name}
                    src={`/flags/${flag}`}
                    className="mr-2 h-3 w-4 drop-shadow-[0.5px_0.5px_0.5px_rgba(0,0,0,0.25)]"
                  />
                  {name}
                </div>

                {code !== "en" && langProgress !== undefined && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs">{langProgress}%</span>
                    <RadialProgress progress={langProgress} />
                  </div>
                )}
              </Link>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export function LanguagePickerSkeleton() {
  return (
    <div className="flex w-12 items-center justify-between">
      <div className="h-[15px] w-5 animate-pulse bg-gray-200" />
      <ChevronDownIcon
        className="size-6"
        pathClassName="stroke-gray-200 animate-pulse"
      />
    </div>
  )
}
