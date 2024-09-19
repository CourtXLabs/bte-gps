import * as d3 from "d3"

interface Props {
  height: number
  width: number
  chart: d3.Selection<SVGGElement | null, unknown, null, undefined>
  data: [string, number][]
  tickValues?: string[]
}

const addXAxis = ({ height, width, tickValues, chart, data }: Props) => {
  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(data.map((d) => d[0]))
    .padding(0.2)

  const xAxis = d3.axisBottom(x)
  if (tickValues) {
    xAxis.tickValues(tickValues)
  }

  chart
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", "12px")

  return x
}

export default addXAxis
