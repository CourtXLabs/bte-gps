"use client"

import { MoveIds, moveIdToNames } from "@/constants/misc"
import useResize from "@/hooks/useResize"
import { Colors, foregroundColors } from "@/types"
import calculateNewWidth from "@/utils/charts/calculateNewWidth"
import * as d3 from "d3"
import { useEffect, useRef } from "react"

const height = 420
const margin = { top: 0, right: 0, bottom: 0, left: 0 }
const topPadding = 40

const colors = [
  Colors.POUND,
  Colors.CROSSOVER,
  Colors.IN_AND_OUT,
  Colors.BETWEEN_THE_LEGS,
  Colors.BEHIND_THE_BACK,
  Colors.HALF_SPIN,
  Colors.SPIN,
]

const colorKeys = ["POUND", "CROSSOVER", "IN_AND_OUT", "BETWEEN_THE_LEGS", "BEHIND_THE_BACK", "HALF_SPIN", "SPIN"]

interface Props {
  data: Record<string, number>
}

export default function DribblePieChart({ data }: Props) {
  const formattedData = Object.entries(data)
    .flatMap(([key, value]) => ({
      key,
      name: moveIdToNames[Number(key) as MoveIds],
      value,
    }))
    .sort((a, b) => a.key.localeCompare(b.key))

  const svgRef = useRef<SVGSVGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const maxWidth = useResize({
    containerRef,
    calculateNewWidth: (containerRef) => calculateNewWidth({ containerRef, margin }),
  })
  const width = Math.min(maxWidth, 500)
  const radius = Math.min(width, height) / 2

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
      .attr("strokeWidth", 2)

    // Define the label arc for positioning labels inside the pie slices
    const labelArc = d3
      .arc()
      .outerRadius(radius * 0.6) // Adjust this factor to position labels further inward or outward
      .innerRadius(radius * 0.6)

    arcs
      .append("text")
      .attr("transform", function (d: any) {
        return `translate(${labelArc.centroid(d)})`
      })
      .attr("text-anchor", "middle")
      .each(function (d: any) {
        if (d.data.value === 0) return
        const el = d3.select(this)
        const percent = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
        if (percent < 5) return
        // Append first line (value)
        el.append("tspan").attr("x", 0).attr("dy", "-0.5em").text(d.data.value)
        // Append second line (percentage)
        el.append("tspan")
          .attr("x", 0)
          .attr("dy", "1.2em")
          .text(`${percent.toFixed(1)}%`)
      })
      .style("fill", (d, i) => foregroundColors[colorKeys[i] as keyof typeof foregroundColors])
      .style("font-size", "14px")
      .style("font-weight", "600")
  }, [formattedData, width, radius])

  return (
    <div ref={containerRef} className="flex w-full justify-center">
      <svg
        id="dribble-made-pie-chart"
        ref={svgRef}
        className="h-[500px] w-[500px]"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      />
    </div>
  )
}
