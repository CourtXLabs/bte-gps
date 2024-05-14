import { OVERTIME, gameTypePeriodName, halvesPeriodNumberToWord, quartersPeriodNumberToWord } from "@/constants/periods"
import { GameTypes, PeriodName } from "@/types"

export const formatPeriod = (period: number, gameType: GameTypes) => {
  const periodName = gameTypePeriodName[gameType]
  const periodNumberToWord = periodName === PeriodName.QUARTER ? quartersPeriodNumberToWord : halvesPeriodNumberToWord
  const periodWord = periodNumberToWord[period]
  if (periodWord === OVERTIME) {
    return periodWord
  }
  return `${periodNumberToWord[period]} ${periodName}`
}
