interface Props {
  chart: d3.Selection<SVGGElement | null, unknown, null, undefined>
  y: d3.ScaleLinear<number, number>
  height: number
  delay?: number
  duration?: number
}

const animateBars = ({ chart, y, height, duration = 800, delay = 800 }: Props) => {
  chart
    .selectAll("rect")
    .transition()
    .duration(duration)
    .attr("y", (d: any) => y(d[1]))
    .attr("height", (d: any) => height - y(d[1]))
    .delay((d, i) => i * delay)
}

export default animateBars
