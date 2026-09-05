import { pgEnum } from "drizzle-orm/pg-core"
import * as v from "valibot"

export const playerRoleEnum = pgEnum("player_role", ["player", "captain"])
export const PlayerRoleSchema = v.picklist(playerRoleEnum.enumValues)
export type PlayerRole = v.InferOutput<typeof PlayerRoleSchema>

export const roundEnum = pgEnum("round", [
  "qualifiers",
  "round_of_32",
  "round_of_16",
  "quarterfinals",
  "semifinals",
  "finals",
  "grand_finals"
])
export const RoundSchema = v.picklist(roundEnum.enumValues)
export type Round = v.InferOutput<typeof RoundSchema>

export const modEnum = pgEnum("mod", ["NM", "HD", "HR", "DT", "LM", "TB"])
export const ModSchema = v.picklist(modEnum.enumValues)
export type Mod = v.InferOutput<typeof ModSchema>

export const subModEnum = pgEnum("sub_mod", [
  "BR",
  "TC",
  "DF",
  "GR",
  "SI",
  "WG",
  "TR",
  "WU",
  "WD",
  "AD",
  "NS",
  "MG",
  "RP",
  "AS",
  "FR",
  "BU",
  "SY",
  "DP"
])
export const SubModSchema = v.picklist(subModEnum.enumValues)
export type SubMod = v.InferOutput<typeof SubModSchema>
