"use client"

import { Colors } from "@/types"
import * as d3 from "d3"
import { useEffect, useRef } from "react"

const width = 500
const height = 400
const radius = Math.min(width, height) / 2

const colors = [
  Colors.POUND,
  Colors.CROSSOVER,
  Colors.IN_AND_OUT,
  Colors.BETWEEN_THE_LEGS,
  Colors.BEHIND_THE_BACK,
  Colors.SPIN,
]

export default function DribblePieChart() {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const data = [
      { value: 35, name: "Group A" },
      { value: 12, name: "Group B" },
      { value: 8, name: "Group C" },
      { value: 12, name: "Group D" },
      { value: 6, name: "Group E" },
      { value: 4, name: "Group F" },
    ]
    const svg = d3.select(svgRef.current)

    svg.selectAll("*").remove()

    const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`)
    const pie = d3.pie().value((d: any) => d.value)
    const arc = d3.arc().innerRadius(0).outerRadius(radius)
    const color = d3.scaleOrdinal(colors)

    // Render the pie chart
    g.selectAll(".arc")
      .data(pie(data as any))
      .enter()
      .append("path")
      .attr("d", arc as any)
      .attr("fill", (d, i) => color(i as any))
      .attr("stroke", "#1f1e1e")
      .attr("stroke-width", 2)
  }, [])

  return (
    <svg
      id="dribble-made-pie-chart"
      ref={svgRef}
      className="h-[450px] w-[500px]"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    />
  )
}
