import { SeuqenceGraphData } from "@/types"
import DribblePieChart from "./DribblePieChart"
import DribblePieChartLegend from "./DribblePieChartLegend"

interface Props {
  dribbleCounts: SeuqenceGraphData
  allDribbleCounts: Record<string, number>
}

export default function DribblePieChartsSection({ dribbleCounts, allDribbleCounts }: Props) {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
        <div>
          <h2 className="pb-6 text-center text-2xl font-bold">Made Shots Dribbles Count</h2>
          <DribblePieChart data={dribbleCounts.moveCounts!.madeShots} />
        </div>
        <div>
          <h2 className="pb-6 text-center text-2xl font-bold">Missed Shots Dribbles Count</h2>
          <DribblePieChart data={dribbleCounts.moveCounts!.missedShots} />
        </div>
      </div>
      <DribblePieChartLegend data={allDribbleCounts} />
    </>
  )
}
