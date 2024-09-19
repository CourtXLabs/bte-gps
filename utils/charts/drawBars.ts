import { PRIMARY_COLOR } from "@/constants/graphs"

interface Props {
  chart: d3.Selection<SVGGElement | null, unknown, null, undefined>
  data: any[]
  x: d3.ScaleBand<string>
  height: number
}

const drawBars = ({ chart, height, data, x }: Props) => {
  chart
    .selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d[0])!)
    .attr("width", x.bandwidth())
    .attr("fill", PRIMARY_COLOR)
    .attr("height", 0)
    .attr("y", height)
}

export default drawBars
