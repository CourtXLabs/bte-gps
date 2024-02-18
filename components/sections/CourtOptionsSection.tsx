import { gameTypesPeriods } from "@/constants"
import useBteStore from "@/stores/bteDataStore"
import { Button } from "../ui/button"

const CourtOptionsSection = () => {
  const { incrementPeriod, decrementPeriod, activePeriod, game } = useBteStore()

  const onClickNextPeriod = () => {
    incrementPeriod()
  }

  const onClickPreviousPeriod = () => {
    decrementPeriod()
  }

  const currentActivePeriod = activePeriod
  const gameType = game.gameType
  const maxPeriod = gameTypesPeriods[gameType]
  const canHaveNextPeriod = currentActivePeriod < maxPeriod
  const canHavePreviousPeriod = currentActivePeriod > 1

  return (
    <div className="flex justify-between">
      <Button type="submit" form="game-form">
        Save Game
      </Button>
      <div className="flex items-center gap-3">
        <Button disabled={!canHavePreviousPeriod} type="button" onClick={onClickPreviousPeriod}>
          Previous Period
        </Button>
        <Button disabled={!canHaveNextPeriod} type="button" onClick={onClickNextPeriod}>
          Next Period
        </Button>
      </div>
    </div>
  )
}

export default CourtOptionsSection
