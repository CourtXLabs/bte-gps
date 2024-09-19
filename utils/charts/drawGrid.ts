import * as d3 from "d3"

interface Props {
  chart: d3.Selection<SVGGElement | null, unknown, null, undefined>
  width: number
  y: d3.ScaleLinear<number, number>
}

const drawGrid = ({ chart, width, y }: Props) => {
  // Apply styles to X-axis lines and ticks
  chart.selectAll(".domain, .tick line").style("stroke", "#E7EAEE").style("opacity", 0.35)

  // Grid lines
  chart
    .append("g")
    .attr("class", "grid")
    .call(
      d3
        .axisLeft(y)
        .tickSize(-width)
        .tickFormat(() => "")
        .ticks(10),
    )
    .style("color", "#E7EAEE")
    .style("opacity", 0.35)
}

export default drawGrid
