import * as d3 from "d3"

interface Props {
  maxPoint: number
  chart: d3.Selection<SVGGElement | null, unknown, null, undefined>
  tickFormat?: any
  tickValues: number[]
  tickCount?: number
  height: number
}

const addYAxis = ({ maxPoint, tickFormat, tickCount, tickValues, chart, height }: Props) => {
  const y = d3.scaleLinear().domain([0, maxPoint]).range([height, 0])
  const call = d3.axisLeft(y)

  if (tickFormat) {
    call.tickFormat(tickFormat)
  }

  if (tickValues) {
    call.tickValues(tickValues)
  }

  if (tickCount) {
    call.ticks(tickCount)
  }

  chart
    .append("g")
    .call(call)
    .style("font-size", "12px")
    .selectAll("path, line") // Apply styles to both axis line and ticks
    .style("stroke", "#E7EAEE")
    .style("opacity", 0.35)

  return y
}

export default addYAxis
