"use client"

import { ChevronDownIcon } from "~/components/icons/chevron-down"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select"
import { Link } from "~/i18n/navigation"
import type { Round } from "~/lib/db/schema"

const roundSelector: { label: string; value: Round }[] = [
  { label: "QUALIFIERS", value: "qualifiers" },
  { label: "ROUND OF 32", value: "round_of_32" },
  { label: "ROUND OF 16", value: "round_of_16" },
  { label: "QUARTER FINALS", value: "quarterfinals" },
  { label: "SEMI FINALS", value: "semifinals" },
  { label: "FINALS", value: "finals" },
  { label: "GRAND FINALS", value: "grand_finals" }
]

export function PoolSelector({ round }: { round: Round }) {
  return (
    <div>
      <Select items={roundSelector} value={round}>
        <SelectTrigger className="group bg-milky-white absolute top-8 right-0 h-[45px] w-[200px] px-4 focus:outline-hidden md:h-[61px] md:w-[300px] lg:w-[400px]">
          <SelectValue className="flex items-center gap-3">
            {(value: (typeof roundSelector)[number]["value"]) => (
              <>
                <div className="text-light-blue text-md text-left font-extrabold md:text-lg lg:text-xl">
                  {roundSelector.find((i) => i.value === value)?.label}
                </div>
                <ChevronDownIcon className="text-light-blue pointer-events-none size-6 transition-all duration-300 group-data-popup-open:rotate-180 md:size-8" />
              </>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-[160px] drop-shadow-none md:w-[180px]">
          {roundSelector.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              render={
                <Link
                  href={`/mappool?round=${item.value}`}
                  prefetch
                  className="flex"
                >
                  {item.label}
                </Link>
              }
            />
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
