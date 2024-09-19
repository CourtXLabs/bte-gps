"use client"

import { MoveIds, moveIdToNames } from "@/constants/misc"
import useResize from "@/hooks/useResize"
import { Colors } from "@/types"
import calculateNewWidth from "@/utils/charts/calculateNewWidth"
import * as d3 from "d3"
import { useEffect, useRef } from "react"

const height = 350
const margin = { top: 0, right: 0, bottom: 0, left: 0 }
const topPadding = 80

const colors = [
  Colors.POUND,
  Colors.CROSSOVER,
  Colors.IN_AND_OUT,
  Colors.BETWEEN_THE_LEGS,
  Colors.BEHIND_THE_BACK,
  Colors.HALF_SPIN,
  Colors.SPIN,
]

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
      .attr("stroke-width", 2)

    const arrowArc = d3
      .arc()
      .innerRadius(radius + 16)
      .outerRadius(radius + 16)
    const labelArc = d3
      .arc()
      .outerRadius(radius + 40) // Position labels outside of the pie
      .innerRadius(radius + 40)

    arcs
      .append("text")
      .attr("transform", function (d: any) {
        return `translate(${labelArc.centroid(d)})`
      })
      .attr("text-anchor", "middle") // Center text horizontally
      .each(function (d: any) {
        if (d.data.value === 0) return
        const el = d3.select(this)
        const percent = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
        if (percent < 3) return
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
        if (d.data.value === 0) return
        const percent = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
        if (percent < 3) return
        const pos = arrowArc.centroid(d)
        const posInner = arc.centroid(d)
        const midAngle = (d.startAngle + d.endAngle) / 2
        const lineLength = 4
        const x2 = pos[0] + Math.cos(midAngle) * lineLength
        const y2 = pos[1] + Math.sin(midAngle) * lineLength

        return [posInner, [x2, y2], pos]
      })
  }, [formattedData, width])

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
