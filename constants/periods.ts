import { GameTypes, PeriodName, PeriodToWord } from "@/types"

export const OVERTIME = "Overtime"

export const quartersPeriodNumberToWord = {
  1: "First",
  2: "Second",
  3: "Third",
  4: "Fourth",
  5: OVERTIME,
} as PeriodToWord

export const halvesPeriodNumberToWord = {
  1: "First",
  2: "Second",
  3: OVERTIME,
} as PeriodToWord

export const gameTypePeriodName = {
  [GameTypes.HIGH_SCHOOL]: PeriodName.QUARTER,
  [GameTypes.PROFESSIONAL]: PeriodName.QUARTER,
  [GameTypes.COLLEGE]: PeriodName.HALF,
}
