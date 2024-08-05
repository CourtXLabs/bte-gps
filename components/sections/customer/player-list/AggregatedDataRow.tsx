import { TableCell, TableRow } from "@/components/ui/table"
import { ReportApiData } from "@/types"
import {
  getAggregatedComboToPointRatio,
  getAggregatedCounterDirectionPercent,
  getAggregatedEfficiencyScore,
  getAggregatedFrequencyPercent,
  getAggregatedIndividualDribblePercent,
  getAggregatedIntialDirectionPercent,
  getAggregatedLaneDribblePercent,
  getAggregatedLastHandPercent,
  getAggregatedPlayCodePercent,
  getAggregatedShootingOffDribblePercent,
  getAggregatedShootingOffStationaryPercent,
} from "@/utils/calculate-aggregated-data"

interface ActiveData {
  individualDribble: string
  lane: string
  playCode: string
  shootingOffDribbles: string
  shootingStationary: string
  frequency: string
  initialDirection: string
  counterDirection: string
  lastHand: string
}

interface Props {
  data: ReportApiData[]
  activeData: ActiveData
}

export default function AggregatedDataRow({ data, activeData }: Props) {
  return (
    <TableRow>
      <TableCell className="text-center" colSpan={2}></TableCell>
      <TableCell className="text-center">
        {getAggregatedIndividualDribblePercent(data, activeData.individualDribble).toFixed(1)}%
      </TableCell>
      <TableCell className="text-center">
        {getAggregatedLaneDribblePercent(data, activeData.lane).toFixed(1)}%
      </TableCell>
      <TableCell className="text-center">
        {getAggregatedPlayCodePercent(data, activeData.playCode).toFixed(1)}%
      </TableCell>
      <TableCell className="text-center">
        {getAggregatedShootingOffDribblePercent(data, activeData.shootingOffDribbles).toFixed(1)}%
      </TableCell>
      <TableCell className="text-center">
        {getAggregatedShootingOffStationaryPercent(data, activeData.shootingStationary).toFixed(1)}%
      </TableCell>
      <TableCell className="text-center">
        {getAggregatedFrequencyPercent(data, activeData.frequency).toFixed(1)}%
      </TableCell>
      <TableCell className="text-center">{getAggregatedComboToPointRatio(data)}</TableCell>
      <TableCell className="text-center">
        {getAggregatedIntialDirectionPercent(data, activeData.initialDirection).toFixed(1)}%
      </TableCell>
      <TableCell className="text-center">
        {getAggregatedCounterDirectionPercent(data, activeData.counterDirection).toFixed(1)}%
      </TableCell>
      <TableCell className="text-center">
        {getAggregatedLastHandPercent(data, activeData.lastHand).toFixed(1)}%
      </TableCell>
      <TableCell className="text-center">{getAggregatedEfficiencyScore(data).toFixed(1)}</TableCell>
    </TableRow>
  )
}
