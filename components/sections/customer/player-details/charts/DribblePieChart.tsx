"use client"

import { moveIdKeys, moveIdToNames } from "@/constants"
import { Colors } from "@/types"
import { getIsShot } from "@/utils/get-is-shot"
import * as d3 from "d3"
import { useEffect, useRef } from "react"

const width = 500
const height = 260
const radius = Math.min(width, height) / 2
const legendPadding = 24
const rectangleWidth = 15
const rectangleHeight = 15
const bottomPadding = 180
const topPadding = 80

const colors = [
  Colors.POUND,
  Colors.CROSSOVER,
  Colors.IN_AND_OUT,
  Colors.BETWEEN_THE_LEGS,
  Colors.BEHIND_THE_BACK,
  Colors.SPIN,
]

interface Props {
  data: Record<moveIdKeys, number>
}

export default function DribblePieChart({ data }: Props) {
  const formattedData = Object.entries(data).flatMap(([key, value]) =>
    getIsShot(Number(key)) ? [] : { key, name: moveIdToNames[key as moveIdKeys], value },
  )

  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2 + topPadding})`)
    const pie = d3.pie().value((d: any) => d.value)
    const arc = d3.arc().innerRadius(0).outerRadius(radius)
    const color = d3.scaleOrdinal(colors)

    // Render the pie chart
    const arcs = g
      .selectAll(".arc")
      .data(pie(formattedData as any))
      .enter()
      .append("g")
      .attr("class", "arc")

    arcs
      .append("path")
      .attr("d", arc as any)
      .attr("fill", (d, i) => color(i as any))
      .attr("stroke", "#1f1e1e")
      .attr("stroke-width", 2)

    const totalLegendWidth = formattedData.reduce((acc, cur, idx) => {
      return acc + rectangleWidth + (idx < formattedData.length - 1 ? legendPadding : 0)
    }, 0)
    const startX = (width - totalLegendWidth) / 2
    const legend = svg.append("g").attr("transform", `translate(${startX}, ${height + bottomPadding})`)

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

    const arrowArc = d3
      .arc()
      .innerRadius(radius + 16)
      .outerRadius(radius + 16)
    const labelArc = d3
      .arc()
      .outerRadius(radius + 48) // Position labels outside of the pie
      .innerRadius(radius + 48)

    arcs
      .append("text")
      .attr("transform", function (d: any) {
        return `translate(${labelArc.centroid(d)})`
      })
      .attr("text-anchor", "middle") // Center text horizontally
      .each(function (d: any) {
        const el = d3.select(this)
        const percent = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
        // Append first line (value)
        el.append("tspan").attr("x", 0).attr("dy", "-0.9em").text(d.data.value)
        // Append second line (percentage)
        el.append("tspan")
          .attr("x", 0)
          .attr("dy", "1.2em")
          .text(`${percent.toFixed(1)}%`)
      })
      .style("fill", "white")
      .style("font-size", "14px")
      .style("font-weight", "500")

    // Adjust the connecting lines
    arcs
      .append("polyline")
      // @ts-ignore
      .attr("stroke", (d, i) => color(i)) // Match color with pie section
      .attr("stroke-width", "2")
      .attr("fill", "none")
      // @ts-ignore
      .attr("points", function (d: any) {
        const pos = arrowArc.centroid(d)
        const posInner = arc.centroid(d)
        const midAngle = (d.startAngle + d.endAngle) / 2
        const lineLength = 4
        const x2 = pos[0] + Math.cos(midAngle) * lineLength
        const y2 = pos[1] + Math.sin(midAngle) * lineLength

        return [posInner, [x2, y2], pos]
      })
  }, [formattedData])

  return (
    <svg
      id="dribble-made-pie-chart"
      ref={svgRef}
      className="h-[500px] w-[500px]"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    />
  )
}
