"use client"

import { ComboToPointData } from "@/types"
import * as d3 from "d3"
import { useEffect, useRef } from "react"

const PRIMARY_COLOR = "#FCBE22"

interface Props {
  data: ComboToPointData[]
}

export default function PlayerCharts({ data }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 90, left: 40 },
    width = 500 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom

  useEffect(() => {
    // append the svg object to the body of the page
    var svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    // X axis
    var x = d3
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

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 50]).range([height, 0])
    svg.append("g").call(d3.axisLeft(y))

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
  }, [])

  return (
    <svg
      id="combo-to-point"
      ref={svgRef}
      className="h-[450px] w-[500px]"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    />
  )
}
