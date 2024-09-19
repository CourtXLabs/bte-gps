import { Margin } from "@/types"
import addAxisLabel from "./addAxisLabel"

interface Props {
  chart: d3.Selection<SVGGElement | null, unknown, null, undefined>
  margin: Margin
  width: number
  height: number
  title: string
}

const addXAxisLabel = ({ chart, margin, width, height, title }: Props) => {
  addAxisLabel({ chart, x: width / 2, y: height + margin.bottom - 10, title })
}

export default addXAxisLabel
