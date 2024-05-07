import { GameTypes } from "../types"

export const moveIdToNames = {
  0: "Start / Stand",
  1: "Pound",
  2: "Cross",
  3: "In + Out",
  4: "Between The Legs",
  5: "Behind The Back",
  6: "Spin",
  7: "Made Shot",
  8: "Missed Shot",
}
export type MoveIds = keyof typeof moveIdToNames
export type moveIdKeys = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"

export const INITIAL_GAME_TYPE = GameTypes.COLLEGE

export const gameTypesPeriods = {
  [GameTypes.COLLEGE]: 3,
  [GameTypes.HIGH_SCHOOL]: 5,
  [GameTypes.PROFESSIONAL]: 5,
}

export const DEFAULT_PAGE_SIZE = 10

export const EMPTY_AUTOCOMPLETE_VALUE = -1
