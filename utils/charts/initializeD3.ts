import * as d3 from "d3"
import { MutableRefObject } from "react"

interface Props {
  svgRef: MutableRefObject<SVGSVGElement | null>
  chartRef: MutableRefObject<SVGGElement | null>
  width: number
  height: number
  margin: { top: number; right: number; bottom: number; left: number }
}

const initializeD3 = ({ svgRef, chartRef, width, height, margin }: Props) => {
  // Create SVG and chart group only once
  if (!chartRef.current) {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    chartRef.current = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`).node()
  }

  const chart = d3.select(chartRef.current)
  // Clear existing content
  chart.selectAll("*").remove()

  return chart
}

export default initializeD3
