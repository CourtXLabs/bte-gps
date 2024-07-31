"use client"

import { SequenceCombosData } from "@/types"
import * as d3 from "d3"
import { useEffect, useRef } from "react"

const PRIMARY_COLOR = "#FCBE22"
const margin = { top: 48, right: 30, bottom: 70, left: 50 }
const width = 700 - margin.left - margin.right
const height = 500 - margin.top - margin.bottom

interface Props {
  data: SequenceCombosData[]
}

export default function ComboTimesUsedChart({ data }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const chartRef = useRef<SVGGElement | null>(null)

  // Sort data and take the top 25 values
  const sortedData = data.sort((a, b) => b.count - a.count).slice(0, 25)
  const maxPoint = Math.round(Math.max(...sortedData.map((d) => d.count)) * 1.25)

  const calculateTickStep = (maxValue: number): number => {
    if (maxValue <= 100) return 10
    if (maxValue <= 500) return 25
    if (maxValue <= 1000) return 50
    return 100
  }

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

    // Title
    chart
      .append("text")
      .attr("x", (width - margin.left - margin.right) / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .text("Dribble Combos Used")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "#fff")

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width - margin.left - margin.right])
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

    // Adding X-axis Label
    chart
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", (width - margin.left - margin.right) / 2)
      .attr("y", height + margin.bottom - 24)
      .text("Combo")
      .style("font-weight", "500")
      .style("fill", "#fff")
      .style("font-size", "14px")

    // Add Y axis
    const y = d3.scaleLinear().domain([0, maxPoint]).range([height, 0])
    const tickStep = calculateTickStep(maxPoint)

    chart
      .append("g")
      .call(
        d3
          .axisLeft(y)
          .tickFormat(d3.format("d"))
          .tickValues(d3.range(0, maxPoint + 1, tickStep)),
      )
      .style("font-size", "12px")

    // Adding Y-axis Label
    chart
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height / 2))
      .attr("y", -margin.left + 14)
      .text("Number of times used")
      .style("font-weight", "500")
      .style("fill", "#fff")
      .style("font-size", "14px")

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
      .style("color", "#666")

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
      .delay((d, i) => i * 100)
  }, [data, sortedData, maxPoint])

  return (
    <svg
      id="combo-to-point"
      ref={svgRef}
      className="h-[500px] w-[600px]"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    />
  )
}
