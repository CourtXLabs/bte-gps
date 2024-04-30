"use client"

import { moveIdKeys, moveIdToNames } from "@/constants"
import { Colors } from "@/types"
import { getIsShot } from "@/utils/get-is-shot"
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

interface Props {
  data: Record<moveIdKeys, number>
}

export default function DribblePieChart({ data }: Props) {
  const formattedData = Object.entries(data).flatMap(([key, value]) =>
    getIsShot(Number(key)) ? [] : { name: moveIdToNames[key as moveIdKeys], value },
  )

  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    svg.selectAll("*").remove()

    const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`)
    const pie = d3.pie().value((d: any) => d.value)
    const arc = d3.arc().innerRadius(0).outerRadius(radius)
    const color = d3.scaleOrdinal(colors)

    // Render the pie chart
    const arcs = g
      .selectAll(".arc")
      .data(pie(formattedData as any))
      .enter()
      .append("path")
      .attr("d", arc as any)
      .attr("fill", (d, i) => color(i as any))
      .attr("stroke", "#1f1e1e")
      .attr("stroke-width", 2)
  }, [formattedData])

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
