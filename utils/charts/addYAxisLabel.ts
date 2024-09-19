import { Margin } from "@/types"
import addAxisLabel from "./addAxisLabel"

interface Props {
  chart: d3.Selection<SVGGElement | null, unknown, null, undefined>
  margin: Margin
  title: string
}

const addYAxisLabel = ({ chart, margin, title }: Props) => {
  addAxisLabel({ chart, x: -margin.left, y: -margin.top + 12 + 20, title, textAnchor: "start" })
}

export default addYAxisLabel
