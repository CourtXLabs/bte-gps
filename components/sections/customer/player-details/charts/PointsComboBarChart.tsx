"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ComboToPointData } from "@/types"
import * as d3 from "d3"
import { useEffect, useRef, useState } from "react"

const PRIMARY_COLOR = "#FCBE22"

const margin = { top: 58, right: 30, bottom: 70, left: 30 }
const height = 500 - margin.top - margin.bottom

interface Props {
  data: ComboToPointData[]
}

export default function PointsComboBarChart({ data }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const chartRef = useRef<SVGGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(600) // Initial width

  const maxCalculatedPoint = Math.round(Math.max(...data.map((d) => Math.max(d.points, d.comboCount))) * 1.25)
  const tickInterval = Math.ceil(maxCalculatedPoint / 10)
  const maxPoint = tickInterval * 10

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth - margin.left - margin.right)
      }
    }

    handleResize() // Set initial width
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (!svgRef.current) return

    // Create SVG and chart group only once
    if (!chartRef.current) {
      const svg = d3.select(svgRef.current).attr("width", width + margin.left + margin.right)

      chartRef.current = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`).node()
    }

    const chart = d3.select(chartRef.current)

    // Clear existing content
    chart.selectAll("*").remove()

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.date))
      .padding(0.2)

    const numTicks = Math.min(20, data.length)
    const tickValues = data.filter((_, i) => i % Math.ceil(data.length / numTicks) === 0).map((d) => d.date)

    const xAxis = d3.axisBottom(x).tickValues(tickValues)
    chart
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "12px")

    // Apply styles to X-axis lines and ticks
    chart.selectAll(".domain, .tick line").style("stroke", "#E7EAEE").style("opacity", 0.35)

    // Add Y axis
    const y = d3.scaleLinear().domain([0, maxPoint]).range([height, 0])
    chart
      .append("g")
      .call(d3.axisLeft(y))
      .style("font-size", "12px")
      .selectAll("path, line") // Apply styles to both axis line and ticks
      .style("stroke", "#E7EAEE")
      .style("opacity", 0.35)

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

    // Bars
    chart
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.date)!)
      .attr("width", x.bandwidth())
      .attr("fill", PRIMARY_COLOR)
      .attr("height", 0)
      .attr("y", height)

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
      .attr("stroke-width", 3)
      .attr("d", line)

    // Animation
    chart
      .selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", (d: any) => y(d.comboCount))
      .attr("height", (d: any) => height - y(d.comboCount))
      .delay((d, i) => i * 30)

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
    <Card className="flex-1">
      <CardHeader className="mx-6 border-b border-[#E7EAEE] border-opacity-50 px-0">
        <p className="text-lg font-semibold">Points and Combos</p>
        <p className="text-sm">This Chart shows the ratio of points & combos made each game</p>
      </CardHeader>
      <CardContent ref={containerRef}>
        <svg
          id="combo-to-point"
          ref={svgRef}
          className="h-[500px] w-full"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        />
      </CardContent>
    </Card>
  )
}
