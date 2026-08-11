import type { Messages } from "next-intl"

import type { Feature } from "./components/feature"

export interface Feature {
  name: keyof Messages["HomePage"]["Features"]["Titles"]
  link: string
}

export const featuresInfo: Feature[] = [
  {
    name: "mappool",
    link: "/info"
  },
  {
    name: "format",
    link: "/info"
  },
  {
    name: "schedule",
    link: "/schedule"
  }
]
