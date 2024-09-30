"use client"

import { ComboToPointData, IGraphFilters, SeuqenceGraphData } from "@/types"
import { useState } from "react"
import ComboTimesUsedChart from "./ComboTimesUsedChart"
import DribblePieChartsSection from "./DribblePieChartsSection"
import GraphFilters from "./GraphFilters"
import PointsComboBarChart from "./PointsComboBarChart"
import SequenceFrequencyChart from "./SequenceFrequencyChart"

interface Props {
  dribbleCounts: SeuqenceGraphData
  comboPointsResponse: ComboToPointData[]
  children?: React.ReactNode
}

export default function SequencesGraphs({ dribbleCounts, comboPointsResponse, children }: Props) {
  const [graphFilters, setGraphFilters] = useState<IGraphFilters>({
    dribbles: true,
    dribbleTypes: false,
    initialDirection: false,
    counterDirection: false,
    lastHand: false,
  })

  const onChangeFilter = (key: keyof IGraphFilters) => {
    setGraphFilters((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const hasGraphs = Object.values(graphFilters).some((filter) => filter)

  return (
    <div className="w-full space-y-10">
      <GraphFilters filters={graphFilters} onChangeFilter={onChangeFilter}>
        {children}
      </GraphFilters>
      {hasGraphs && (
        <div className="flex flex-col items-center space-y-8">
          {graphFilters.dribbles && <DribblePieChartsSection dribbleCounts={dribbleCounts} />}
          {graphFilters.initialDirection && (
            <div className="flex w-full flex-col gap-8 lg:flex-row">
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
            <div className="flex w-full flex-col gap-8 lg:flex-row">
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
            <div className="flex w-full flex-col gap-8 lg:flex-row">
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
          {graphFilters.dribbleTypes && (
            <div className="flex w-full flex-col items-center justify-center gap-8 lg:flex-row">
              {!!comboPointsResponse?.length && <PointsComboBarChart data={comboPointsResponse} />}
              {!!dribbleCounts.comboCounts?.length && <ComboTimesUsedChart data={dribbleCounts.comboCounts} />}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
