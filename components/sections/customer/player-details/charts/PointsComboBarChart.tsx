"use client"

import { CardContent } from "@/components/ui/card"
import useResize from "@/hooks/useResize"
import { ComboToPointData } from "@/types"
import addXAxis from "@/utils/charts/addXAxis"
import addYAxis from "@/utils/charts/addYaxis"
import animateBars from "@/utils/charts/animateBars"
import calculateNewWidth from "@/utils/charts/calculateNewWidth"
import calculateTickStep from "@/utils/charts/calculateTickStep"
import drawBars from "@/utils/charts/drawBars"
import drawGrid from "@/utils/charts/drawGrid"
import initializeD3 from "@/utils/charts/initializeD3"
import * as d3 from "d3"
import { useEffect, useRef } from "react"
import ChartRoot from "./ChartRoot"

const PRIMARY_COLOR = "#FCBE22"

const margin = { top: 58, right: 50, bottom: 70, left: 30 }
const height = 500 - margin.top - margin.bottom

interface Props {
  data: ComboToPointData[]
}

export default function PointsComboBarChart({ data }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const chartRef = useRef<SVGGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const width = useResize({
    containerRef,
    calculateNewWidth: (containerRef) => calculateNewWidth({ containerRef, margin }),
  })

  const maxCalculatedPoint = Math.round(Math.max(...data.map((d) => Math.max(d.points, d.comboCount))) * 1.2)
  const formattedBarsData = data.map((d) => [d.date, d.comboCount] as [string, number])

  const tickStep = calculateTickStep(maxCalculatedPoint)
  const ticksCount = Math.ceil(maxCalculatedPoint / tickStep)
  const maxPoint = ticksCount * tickStep
  const tickValues = d3.range(0, maxPoint + 1, tickStep)

  useEffect(() => {
    if (!svgRef.current) return
    const chart = initializeD3({ svgRef, chartRef, width, height, margin })

    const numTicks = Math.min(20, data.length)
    const xTickValues = data.filter((_, i) => i % Math.ceil(data.length / numTicks) === 0).map((d) => d.date)

    const x = addXAxis({ chart, data: formattedBarsData, width, tickValues: xTickValues, height })
    const y = addYAxis({
      maxPoint,
      chart,
      height,
      tickValues,
    })

    drawGrid({ chart, y, width, tickValues })
    drawBars({ chart, data: formattedBarsData, x, height })

    animateBars({ chart, height, y, delay: 30 })

    // Line
    const line = d3
      .line<ComboToPointData>()
      .x((d) => x(d.date)! + x.bandwidth() / 2)
      .y((d) => y(d.points))

    chart
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-miterlimit", 1)
      .attr("strokeWidth", 3)
      .attr("d", line)

    // Animation

    const legendData = [
      { name: "Points", color: "red" },
      { name: "Combos", color: PRIMARY_COLOR },
    ]

    const legend = chart
      .append("g")
      .attr("font-size", 12)
      .attr("font-weight", 400)
      .style("fill", "white")
      .attr("text-anchor", "start")
      .selectAll("g")
      .data(legendData)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        const offset = i * 58
        return `translate(${offset}, -${margin.top - 8 - 20})` // 20px below the header's bottom border
      })

    legend.each(function (d) {
      const sel = d3.select(this)
      sel.append("circle").attr("cx", -24).attr("cy", 0).attr("r", 4).attr("fill", d.color) // 8px circle
    })

    legend
      .append("text")
      .attr("x", -14) // Adjust text position
      .attr("y", 0)
      .attr("dy", "0.35em")
      .text((d) => d.name)
  }, [data, maxPoint, width])

  return (
    <ChartRoot title="Points and Combos" subtitle="This Chart shows the ratio of points & combos made each game">
      <CardContent ref={containerRef}>
        <svg
          id="combo-to-point"
          ref={svgRef}
          className="h-[500px] w-full"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        />
      </CardContent>
    </ChartRoot>
  )
}
