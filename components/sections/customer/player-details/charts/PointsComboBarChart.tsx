"use client"

import { ComboToPointData } from "@/types"
import * as d3 from "d3"
import { useEffect, useRef } from "react"

const PRIMARY_COLOR = "#FCBE22"

const margin = { top: 48, right: 30, bottom: 70, left: 40 }
const width = 600 - margin.left - margin.right
const height = 500 - margin.top - margin.bottom
interface Props {
  data: ComboToPointData[]
}

export default function PointsComboBarChart({ data }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const maxPoint = Math.round(Math.max(...data.map((d) => d.points)) * 1.25)

  useEffect(() => {
    // append the svg object to the body of the page
    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    svg.selectAll("*").remove()

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function (d) {
          return d.date
        }),
      )
      .padding(0.2)
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "12px")

    // Add Y axis
    const y = d3.scaleLinear().domain([0, maxPoint]).range([height, 0])
    svg.append("g").call(d3.axisLeft(y)).style("font-size", "12px")

    // Grid lines
    svg
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
    svg
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.date)!
      })
      .attr("width", x.bandwidth())
      .attr("fill", PRIMARY_COLOR)
      // no bar at the beginning thus:
      .attr("height", function (d) {
        return height - y(0)
      }) // always equal to 0
      .attr("y", function (d) {
        return y(0)
      })

    // Line
    const line = d3
      .line()
      .x(function (d: any) {
        return x(d.date)! + x.bandwidth() / 2
      }) // Center line in each band
      .y(function (d: any) {
        return y(d.points!)
      })
    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-miterlimit", 1)
      .attr("stroke-width", 3)
      .attr("d", line(data as any))

    // Animation
    svg
      .selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function (d: any) {
        return y(d.comboCount)
      })
      .attr("height", function (d: any) {
        return height - y(d.comboCount)
      })
      .delay(function (d, i) {
        return i * 100
      })

    const legendData = [
      { name: "Points", color: "red", type: "line" },
      { name: "Combos", color: PRIMARY_COLOR, type: "rect" },
    ]

    const legend = svg
      .append("g")
      .attr("font-size", 14)
      .attr("font-weight", 500)
      .style("fill", "white")
      .attr("text-anchor", "middle") // Center alignment
      .selectAll("g")
      .data(legendData)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        // Calculate offset for each legend item to be centered
        const offset = width / 2 + (i - (legendData.length - 1) / 2) * 90
        return `translate(${offset}, 0)`
      })

    legend.each(function (d) {
      const sel = d3.select(this)
      if (d.type === "rect") {
        sel
          .append("rect")
          .attr("x", -9) // Centered relative to the text
          .attr("width", 18)
          .attr("height", 18)
          .attr("fill", d.color)
      } else if (d.type === "line") {
        sel
          .append("line")
          .attr("x1", -9)
          .attr("x2", 9)
          .attr("y1", 9)
          .attr("y2", 9)
          .attr("stroke-width", 3)
          .attr("stroke", d.color)
      }
    })

    legend
      .append("text")
      .attr("x", 40) // Offset text to the right of the shape
      .attr("y", 9) // Vertically center text with the shape
      .attr("dy", "0.35em") // Small vertical adjustment
      .text(function (d) {
        return d.name
      })

    // Move the entire legend group up to place it above the chart
    legend.attr("transform", (d, i) => {
      const offset = (width - margin.left - margin.right) / 2 + (i - (legendData.length - 1) / 2) * 90
      return `translate(${offset}, -40)` // Adjust y-position to move above the chart
    })
  }, [data])

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
