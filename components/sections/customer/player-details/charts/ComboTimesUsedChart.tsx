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
  const maxPoint = Math.round(Math.max(...data.map((d) => d.count)) * 1.25)

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width - margin.left - margin.right])
      .domain(
        data.map(function (d) {
          return d.sequence
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

    // Adding X-axis Label
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", (width - margin.left - margin.right) / 2)
      .attr("y", height + margin.bottom - 24) // Adjust this value to position the label below the X-axis
      .text("Combo")
      .style("font-weight", "500")
      .style("fill", "#fff")
      .style("font-size", "14px")

    // Add Y axis
    const y = d3.scaleLinear().domain([0, maxPoint]).range([height, 0])
    svg
      .append("g")
      .call(
        d3
          .axisLeft(y)
          .tickFormat(d3.format("d"))
          .tickValues(d3.range(0, maxPoint + 1, 1)),
      ) // This will ensure ticks at every integer
      .style("font-size", "12px")

    // Adding Y-axis Label
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height / 2))
      .attr("y", -margin.left + 14) // Adjust this value to position the label to the left of the Y-axis
      .text("Number of times used")
      .style("font-weight", "500")
      .style("fill", "#fff")
      .style("font-size", "14px")

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
        return x(d.sequence)!
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

    // Animation
    svg
      .selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function (d: any) {
        return y(d.count)
      })
      .attr("height", function (d: any) {
        return height - y(d.count)
      })
      .delay(function (d, i) {
        return i * 100
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
