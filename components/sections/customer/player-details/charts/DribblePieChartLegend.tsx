"use client"

import { moveIdKeys, moveIdToNames } from "@/constants/misc"
import { Colors } from "@/types"
import * as d3 from "d3"
import { useEffect, useRef } from "react"

const legendPadding = 24
const rectangleWidth = 15
const rectangleHeight = 15
const width = 500
const topPadding = 24

const colors = [
  Colors.POUND,
  Colors.CROSSOVER,
  Colors.IN_AND_OUT,
  Colors.BETWEEN_THE_LEGS,
  Colors.BEHIND_THE_BACK,
  Colors.SPIN,
]

interface Props {
  data: Record<string, number>
}

export default function DribblePieChartLegend({ data }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  const formattedData = Object.entries(data).flatMap(([key, value]) => ({
    key,
    name: moveIdToNames[key as moveIdKeys],
    value,
  }))

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const color = d3.scaleOrdinal(colors)
    const totalLegendWidth = formattedData.reduce((acc, cur, idx) => {
      return acc + rectangleWidth + (idx < formattedData.length - 1 ? legendPadding : 0)
    }, 0)
    const startX = (width - totalLegendWidth) / 2
    const legend = svg.append("g").attr("transform", `translate(${startX}, ${topPadding})`)

    // Tooltip setup
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "#fff")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("padding", "6px 8px")
      .style("text-align", "center")
      .style("color", "#000")
      .style("font-size", "14px")
      .style("line-height", "1")

    // Create rectangles for the legend
    legend
      .selectAll("rect")
      .data(formattedData)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * (rectangleWidth + legendPadding))
      .attr("y", rectangleHeight)
      .attr("width", rectangleWidth)
      .attr("height", rectangleHeight)
      // @ts-ignore
      .style("fill", (d, i) => color(i))
      .on("mouseover", function (event, d) {
        tooltip
          .style("visibility", "visible")
          .text(d.name)
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px")
      })
      .on("mousemove", function (event) {
        tooltip.style("top", event.pageY - 10 + "px").style("left", event.pageX + 10 + "px")
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden")
      })

    // Create text labels for the legend
    legend
      .selectAll("text")
      .data(formattedData)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * (rectangleWidth + legendPadding) + rectangleWidth / 2)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .text((d) => d.key)
      .style("fill", "white")
      .style("font-size", "14px")
      .style("font-weight", "500")
  }, [formattedData])

  return (
    <svg
      id="dribble-made-pie-chart"
      ref={svgRef}
      className="h-[100px] w-[500px]"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    />
  )
}
