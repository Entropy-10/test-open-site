import { cn } from "cn"
import { useTranslations } from "next-intl"
import type { Messages } from "next-intl"

import { MOD_ORDER } from "~/utils/mods"
import type { Mod, Round } from "~/lib/db/schema"

type Count = number | null

type Label = keyof Messages["Components"]["MappoolTable"]

interface RoundStats {
  label: Label
  sr: number
  bestOf: Count
  bans: Count
  protects: Count
  mods: Record<Mod, Count>
}

type FormatKey = "sr" | "bestOf" | "bans" | "protects"

const FORMAT_COLUMNS: { key: FormatKey; label: Label; className: string }[] = [
  { className: "px-2.5", key: "sr", label: "starRating" },
  { className: "px-2", key: "bestOf", label: "bestOf" },
  { className: "px-2", key: "bans", label: "bans" },
  { className: "px-2", key: "protects", label: "protects" }
]

const MOD_CLASSES: Record<Mod, string> = {
  LM: "text-mod-lm",
  NM: "text-mod-nm",
  HD: "text-mod-hd",
  HR: "text-mod-hr",
  DT: "text-mod-dt",
  TB: "text-mod-tb"
}

const ROUNDS: Record<Round, RoundStats> = {
  qualifiers: {
    label: "qualifiers",
    sr: 6.8,
    bestOf: null,
    bans: null,
    protects: null,
    mods: { LM: 2, NM: 3, HD: 2, HR: 2, DT: 2, TB: null }
  },
  round_of_32: {
    label: "roundOf32",
    sr: 6.2,
    bestOf: 9,
    bans: 1,
    protects: 1,
    mods: { LM: 3, NM: 3, HD: 2, HR: 2, DT: 2, TB: 1 }
  },
  round_of_16: {
    label: "roundOf16",
    sr: 6.4,
    bestOf: 9,
    bans: 1,
    protects: 1,
    mods: { LM: 3, NM: 3, HD: 2, HR: 2, DT: 2, TB: 1 }
  },
  quarterfinals: {
    label: "quarterfinals",
    sr: 6.7,
    bestOf: 11,
    bans: 1,
    protects: 1,
    mods: { LM: 4, NM: 4, HD: 2, HR: 2, DT: 2, TB: 1 }
  },
  semifinals: {
    label: "semifinals",
    sr: 6.9,
    bestOf: 11,
    bans: 2,
    protects: 1,
    mods: { LM: 5, NM: 4, HD: 2, HR: 2, DT: 3, TB: 1 }
  },
  finals: {
    label: "finals",
    sr: 7.2,
    bestOf: 13,
    bans: 2,
    protects: 1,
    mods: { LM: 5, NM: 4, HD: 3, HR: 3, DT: 3, TB: 1 }
  },
  grand_finals: {
    label: "grandFinals",
    sr: 7.5,
    bestOf: 13,
    bans: 2,
    protects: 1,
    mods: { LM: 5, NM: 4, HD: 3, HR: 3, DT: 3, TB: 1 }
  }
}

function poolSize({ mods }: RoundStats) {
  return Object.values(mods).reduce<number>((total, n) => total + (n ?? 0), 0)
}

interface MappoolTableProps {
  className?: string
}

export function MappoolTable({ className }: MappoolTableProps) {
  const t = useTranslations("Components.MappoolTable")

  return (
    <table
      className={cn("table-auto text-center *:*:*:text-nowrap", className)}
    >
      <thead>
        <tr className="border-light-blue border-b-2 *:font-bold">
          <th className="text-left" scope="col">
            {t("round")}
          </th>
          {FORMAT_COLUMNS.map((column) => (
            <th className={column.className} key={column.key} scope="col">
              {t(column.label)}
            </th>
          ))}
          {MOD_ORDER.map((mod) => (
            <th
              className={cn("px-1.5", MOD_CLASSES[mod])}
              key={mod}
              scope="col"
            >
              {mod}
            </th>
          ))}
          <th className="px-1" scope="col">
            {t("total")}
          </th>
        </tr>
      </thead>
      <tbody className="text-blue">
        {Object.entries(ROUNDS).map(([round, stats]) => (
          <tr key={round}>
            <th
              className={cn(
                "pr-5 text-left font-normal",
                "border-light-blue border-r-2"
              )}
              scope="row"
            >
              {t(stats.label)}
            </th>
            {FORMAT_COLUMNS.map((column, index) => (
              <td
                className={cn(
                  index === FORMAT_COLUMNS.length - 1 &&
                    "border-light-blue border-r-2"
                )}
                key={column.key}
              >
                {stats[column.key] ?? "-"}
              </td>
            ))}
            {MOD_ORDER.map((mod, index) => (
              <td
                className={cn(
                  MOD_CLASSES[mod],
                  index === MOD_ORDER.length - 1 &&
                    "border-light-blue border-r-2"
                )}
                key={mod}
              >
                {stats.mods[mod] ?? "-"}
              </td>
            ))}
            <td>{poolSize(stats)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
