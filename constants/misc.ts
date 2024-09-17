import { GameTypes } from "../types"

export const moveIdToNames = {
  0: "Start / Stand",
  1: "Pound",
  2: "Cross",
  3: "In + Out",
  4: "Between The Legs",
  5: "Behind The Back",
  6: "Half Spin",
  7: "Spin",
  8: "Made Shot",
  9: "Missed Shot",
}
export type MoveIds = keyof typeof moveIdToNames
export type moveUids = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "6" | "7" | "8" | "9"

export const idToUid = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
} as Record<MoveIds, moveUids>

export const moveIdToValue = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 0,
  9: 0,
  0: 0,
}

export const INITIAL_GAME_TYPE = GameTypes.HIGH_SCHOOL

export const gameTypesPeriods = {
  [GameTypes.COLLEGE]: 3,
  [GameTypes.HIGH_SCHOOL]: 5,
  [GameTypes.PROFESSIONAL]: 5,
}

export const DEFAULT_PAGE_SIZE = 10

export const EMPTY_AUTOCOMPLETE_VALUE = -1
