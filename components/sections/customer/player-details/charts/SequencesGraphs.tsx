"use client"

import { IGraphFilters, SeuqenceGraphData } from "@/types"
import { useState } from "react"
import DribblePieChartsSection from "./DribblePieChartsSection"
import GraphFilters from "./GraphFilters"
import SequenceFrequencyChart from "./SequenceFrequencyChart"

interface Props {
  dribbleCounts: SeuqenceGraphData
}

export default function SequencesGraphs({ dribbleCounts }: Props) {
  const allDribbleCounts = { ...dribbleCounts.moveCounts?.madeShots, ...dribbleCounts.moveCounts?.missedShots }
  const [graphFilters, setGraphFilters] = useState<IGraphFilters>({
    dribbles: false,
    initialDirection: false,
    counterDirection: false,
    lastHand: false,
  })

  const onChangeFilter = (key: keyof IGraphFilters) => {
    setGraphFilters((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const showDribblesGraphs = graphFilters.dribbles && !!dribbleCounts.moveCounts

  return (
    <div className="mx-auto mt-4 max-w-screen-2xl">
      <GraphFilters filters={graphFilters} onChangeFilter={onChangeFilter} />
      <div className="flex flex-col items-center space-y-10 py-10">
        {showDribblesGraphs && (
          <DribblePieChartsSection dribbleCounts={dribbleCounts} allDribbleCounts={allDribbleCounts} />
        )}
        {graphFilters.initialDirection && (
          <div className="flex w-full flex-col items-center gap-8 lg:flex-row">
            <SequenceFrequencyChart
              subtitle="This chart shows the frequency of initial direction moves used for MADE shots"
              data={dribbleCounts.seuqenceInfoCounts?.initialDirectionCounts?.madeShots}
              title="Initial Direction Made Shots"
              xAxisLabel="Initial Direction"
              yAxisLabel="Number of times used"
            />
            <SequenceFrequencyChart
              subtitle="This chart shows the frequency of initial direction moves used for MISSED shots"
              data={dribbleCounts.seuqenceInfoCounts?.initialDirectionCounts?.missedShots}
              title="Initial Direction Missed Shots"
              xAxisLabel="Initial Direction"
              yAxisLabel="Number of times used"
            />
          </div>
        )}
        {graphFilters.counterDirection && (
          <div className="flex w-full flex-col items-center gap-8 lg:flex-row">
            <SequenceFrequencyChart
              subtitle="This chart shows the frequency of counter direction moves used for MADE shots"
              data={dribbleCounts.seuqenceInfoCounts?.counterDirectionCounts?.madeShots}
              title="Counter Direction Made Shots"
              xAxisLabel="Counter Direction"
              yAxisLabel="Number of times used"
            />
            <SequenceFrequencyChart
              subtitle="This chart shows the frequency of counter direction moves used for MISSED shots"
              data={dribbleCounts.seuqenceInfoCounts?.counterDirectionCounts?.missedShots}
              title="Counter Direction Missed Shots"
              xAxisLabel="Counter Direction"
              yAxisLabel="Number of times used"
            />
          </div>
        )}
        {graphFilters.lastHand && (
          <div className="flex w-full flex-col items-center gap-8 lg:flex-row">
            <SequenceFrequencyChart
              subtitle="This chart shows the frequency of last hand moves used for MADE shots"
              data={dribbleCounts.seuqenceInfoCounts?.lastDribbleTypeCounts?.madeShots}
              title="Last Hand Made Shots"
              xAxisLabel="Last Hand"
              yAxisLabel="Number of times used"
            />
            <SequenceFrequencyChart
              subtitle="This chart shows the frequency of last hand moves used for MISSED shots"
              data={dribbleCounts.seuqenceInfoCounts?.lastDribbleTypeCounts?.missedShots}
              title="Last Hand Missed Shots"
              xAxisLabel="Last Hand"
              yAxisLabel="Number of times used"
            />
          </div>
        )}
      </div>
    </div>
  )
}
