"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { cn } from "cn"
import { Music, Star, Timer } from "lucide-react"
import { LazyMotion, AnimatePresence, m, domAnimation } from "motion/react"

import { beatmapsetCoverUrl, beatmapUrl } from "~/utils/osu"
import type { Map } from "~/lib/db/schema"

const ModColor = {
  LM: "#F9A0BE",
  NM: "#5E72EB",
  HD: "#FCC164",
  HR: "#F27F85",
  DT: "#8874ED",
  TB: "#5D5048"
} as const

const LazerMods = {
  TR: "Transform",
  WG: "Wiggle",
  GR: "Grow",
  TC: "Traceable",
  BR: "Barrel Roll",
  RP: "Repel",
  BU: "Bubbles",
  DP: "Depth",
  AD: "Approach Different",
  DF: "Deflate",
  SY: "Synesthesia",
  SI: "Spin In",
  NS: "No Scope",
  MG: "Magnetized",
  FR: "Freeze Frame",
  AS: "Adaptive Speed",
  WU: "Wind Up",
  WD: "Wind Down"
} as const

export function MapInfo({ map }: { map: Map }) {
  const [showModInfo, setShowModInfo] = useState(false)

  return (
    <div
      style={{ color: ModColor[map.mod] }}
      className="group relative h-[187px] w-[400px] shadow-[0px_4px_15px_0px_rgba(94,114,235,0.45)]"
    >
      <div className="bg-milky-white absolute top-2 right-2 z-20 px-1 text-sm font-extrabold shadow-sm">
        {map.beatmapId}
      </div>

      <Image
        height={112}
        width={400}
        src={beatmapsetCoverUrl(map.beatmapsetId)}
        alt="map bg"
        className="h-[112px] w-[400px] select-none"
      />
      <div className="from-milky-white absolute bottom-[74px] h-[112px] w-full bg-linear-to-t from-15% to-transparent to-65% opacity-100 transition-all sm:opacity-0 sm:group-hover:opacity-100">
        <div className="relative h-full">
          <div className="absolute bottom-0 flex w-full justify-between px-3 text-sm font-extrabold">
            <div>MAPPER: {map.mapper}</div>
            <div>
              CS: {map.cs} | AR: {map.ar} | OD: {map.od}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-milky-white flex h-[75px] items-center justify-between p-3">
        <div className="flex items-center gap-3 truncate">
          <button
            type="button"
            onClick={() => setShowModInfo(!showModInfo)}
            className="text-milky-white focus:outline-hidden"
            disabled={map.mod !== "LM"}
          >
            <div
              style={{ background: ModColor[map.mod] }}
              className={cn(
                "flex size-12 items-center justify-center text-sm font-extrabold",
                (map.dtRate || map.subMod) && "h-8 w-12"
              )}
            >
              {map.slot}
            </div>
            {(map.dtRate || map.subMod) && (
              <div
                style={{ background: `${ModColor[map.mod]}CC` }}
                className="text-center text-xs font-semibold"
              >
                {map.dtRate ? `${map.dtRate}x` : (map.subMod ?? "")}
              </div>
            )}
          </button>

          <LazyMotion features={domAnimation} strict>
            <AnimatePresence initial={false}>
              {!showModInfo && (
                <m.div
                  key={map.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-[230px] text-sm/5"
                >
                  <Link
                    href={beatmapUrl(map.beatmapId)}
                    target="_blank"
                    className="text-lg/6 font-extrabold hover:underline focus:outline-hidden"
                  >
                    <p className="truncate">{map.name}</p>
                  </Link>
                  <p className="truncate">{map.difficulty}</p>
                </m.div>
              )}
              {showModInfo && (
                <m.div
                  key={`${map.name}-exit`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="font-extrabold uppercase">
                    {map.subMod && LazerMods[map.subMod]}
                  </div>
                  {map.modSettings?.map((setting) => {
                    const { name, value } = setting as {
                      name: string
                      value: string
                    }
                    return (
                      <div key={name} className="text-sm/5">
                        <span className="font-semibold">
                          {name.toUpperCase()}:{" "}
                        </span>
                        {value}
                      </div>
                    )
                  })}
                  {!map.modSettings && (
                    <div className="text-sm/5">default settings</div>
                  )}
                </m.div>
              )}
            </AnimatePresence>
          </LazyMotion>
        </div>

        <div className="text-right text-sm font-extrabold">
          <div className="flex items-center justify-end gap-1">
            {map.bpm} <Music size={16} strokeWidth={3} />
          </div>
          <div className="flex items-center justify-end gap-1">
            {map.sr} <Star size={16} strokeWidth={3} />
          </div>
          <div className="flex items-center justify-end gap-1">
            {map.length} <Timer size={16} strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  )
}
