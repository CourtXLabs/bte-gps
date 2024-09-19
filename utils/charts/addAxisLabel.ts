interface Props {
  chart: d3.Selection<SVGGElement | null, unknown, null, undefined>
  x: number
  y: number
  title: string
}

const addAxisLabel = ({ chart, x, y, title }: Props) => {
  chart
    .append("text")
    .attr("text-anchor", "start")
    .attr("x", x)
    .attr("y", y)
    .text(title)
    .style("fill", "#fff")
    .style("font-size", "14px")
}

export default addAxisLabel
