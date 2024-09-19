import { Card, CardContent } from "@/components/ui/card"
import { SeuqenceGraphData } from "@/types"
import DribblePieChart from "./DribblePieChart"
import DribblePieChartLegend from "./DribblePieChartLegend"
import DribblePieChartWrapper from "./DribblePieChartWrapper"

interface Props {
  dribbleCounts: SeuqenceGraphData
  allDribbleCounts: Record<string, number>
}

export default function DribblePieChartsSection({ dribbleCounts, allDribbleCounts }: Props) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col  pt-6">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-12">
          <DribblePieChartWrapper
            title="Made Shots Dribbles Count"
            subtitle="This Pie Chart shows the ratio of dribble types for MADE shots"
          >
            <DribblePieChart data={dribbleCounts.moveCounts!.madeShots} />
          </DribblePieChartWrapper>
          <DribblePieChartWrapper
            title="Missed Shots Dribbles Count"
            subtitle="This Pie Chart shows the ratio of dribble types for MISSED shots"
          >
            <DribblePieChart data={dribbleCounts.moveCounts!.missedShots} />
          </DribblePieChartWrapper>
        </div>
        <DribblePieChartLegend data={allDribbleCounts} />
      </CardContent>
    </Card>
  )
}
