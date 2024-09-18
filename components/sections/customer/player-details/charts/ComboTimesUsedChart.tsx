"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SequenceCombosData } from "@/types"
import * as d3 from "d3"
import { useEffect, useRef, useState } from "react"

const PRIMARY_COLOR = "#FCBE22"
const margin = { top: 58, right: 30, bottom: 70, left: 30 }
const height = 500 - margin.top - margin.bottom

const calculateTickStep = (maxValue: number): number => {
  if (maxValue <= 50) return 5
  if (maxValue <= 100) return 10
  if (maxValue <= 500) return 25
  if (maxValue <= 1000) return 50
  return 100
}

interface Props {
  data: SequenceCombosData[]
}

export default function ComboTimesUsedChart({ data }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const chartRef = useRef<SVGGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(600) // Initial width

  // Sort data and take the top 25 values
  const sortedData = data.sort((a, b) => b.count - a.count).slice(0, 25)
  const maxCalculatedPoint = Math.round(Math.max(...sortedData.map((d) => d.count)) * 1.25)
  const tickStep = calculateTickStep(maxCalculatedPoint)

  const tickInterval = Math.ceil(maxCalculatedPoint / tickStep)
  const maxPoint = tickInterval * tickStep

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
      const svg = d3
        .select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

      chartRef.current = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`).node()
    }

    const chart = d3.select(chartRef.current)

    // Clear existing content
    chart.selectAll("*").remove()

    // Add Y-axis title above the chart
    chart
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", margin.left + 12)
      .attr("y", -margin.top + 12 + 20)
      .text("Number of times used")
      .style("fill", "#fff")
      .style("font-size", "14px")

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(sortedData.map((d) => d.sequence))
      .padding(0.2)

    chart
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
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
      .call(
        d3
          .axisLeft(y)
          .tickFormat(d3.format("d"))
          .tickValues(d3.range(0, maxPoint + 1, tickStep)),
      )
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
      .data(sortedData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.sequence)!)
      .attr("width", x.bandwidth())
      .attr("fill", PRIMARY_COLOR)
      .attr("height", 0)
      .attr("y", height)

    // Animation
    chart
      .selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", (d: any) => y(d.count))
      .attr("height", (d: any) => height - y(d.count))
      .delay((d, i) => i * 30)

    // X-axis label
    chart
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .text("Combo")
      .style("fill", "#fff")
      .style("font-size", "14px")
  }, [data, sortedData, maxPoint, width])

  return (
    <Card className="flex-1">
      <CardHeader className="mx-6 border-b border-[#E7EAEE] border-opacity-50 px-0">
        <p className="text-lg font-semibold">Dribble Combos Used</p>
        <p className="text-sm">This chart shows how many times each combo was used</p>
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
