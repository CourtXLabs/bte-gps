interface Props {
  chart: d3.Selection<SVGGElement | null, unknown, null, undefined>
  textAnchor?: string
  x: number
  y: number
  title: string
}

const addAxisLabel = ({ chart, x, y, title, textAnchor = "middle" }: Props) => {
  chart
    .append("text")
    .attr("text-anchor", textAnchor)
    .attr("x", x)
    .attr("y", y)
    .text(title)
    .style("fill", "#fff")
    .style("font-size", "14px")
}

export default addAxisLabel
