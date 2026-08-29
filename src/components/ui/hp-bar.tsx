"use client"

import * as stylex from "@stylexjs/stylex"

const dyn = stylex.create({
  bar: (pct: number, hue: string) => ({
    width: `${pct}%`,
    backgroundColor: hue,
    height: "12px",
    transition: "width 200ms"
  })
})

export function HpBar({ pct, hue }: { pct: number; hue: string }) {
  return <div {...stylex.props(dyn.bar(pct, hue))} />
}
