import { GameTypes } from "../types"

export const moveIdToNames = {
  0: "Start / Stand",
  1: "Pound",
  2: "Cross",
  3: "In + Out",
  4: "Between The Legs",
  5: "Behind The Back",
  55: "Half Spin",
  "5.5": "Half Spin",
  6: "Spin",
  7: "Made Shot",
  8: "Missed Shot",
}
export type MoveIds = keyof typeof moveIdToNames
export type moveUids = "0" | "1" | "2" | "3" | "4" | "5" | "5.5" | "6" | "7" | "8"

export const idToUid = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  55: "5.5",
  "5.5": "5.5",
  6: "6",
  7: "7",
  8: "8",
} as Record<MoveIds, moveUids>

export const moveIdToValue = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  "5.5": 5.5,
  55: 5.5,
  6: 6,
  7: 0,
  8: 0,
  0: 0,
}

export const INITIAL_GAME_TYPE = GameTypes.PROFESSIONAL

export const gameTypesPeriods = {
  [GameTypes.COLLEGE]: 3,
  [GameTypes.HIGH_SCHOOL]: 5,
  [GameTypes.PROFESSIONAL]: 5,
}

export const DEFAULT_PAGE_SIZE = 10

export const EMPTY_AUTOCOMPLETE_VALUE = -1
