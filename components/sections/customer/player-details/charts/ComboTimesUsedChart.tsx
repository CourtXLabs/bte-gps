"use client"

import { CardContent } from "@/components/ui/card"
import useResize from "@/hooks/useResize"
import { SequenceCombosData } from "@/types"
import addXAxis from "@/utils/charts/addXAxis"
import addXAxisLabel from "@/utils/charts/addXAxisLabel"
import addYAxisLabel from "@/utils/charts/addYAxisLabel"
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

const margin = { top: 58, right: 50, bottom: 70, left: 30 }
const height = 500 - margin.top - margin.bottom
const MAX_COMBOS_TO_SHOW = 25

interface Props {
  data: SequenceCombosData[]
}

// Sort data and take the top 25 values
const getSortedData = (data: SequenceCombosData[]) => {
  const dataObject = data.reduce(
    (acc, { sequence, count }) => {
      acc[sequence] = count
      return acc
    },
    {} as Record<string, number>,
  )
  const sortedData = Object.entries(dataObject)
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_COMBOS_TO_SHOW)
  return sortedData
}

export default function ComboTimesUsedChart({ data }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const chartRef = useRef<SVGGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const width = useResize({
    containerRef,
    calculateNewWidth: (containerRef) => calculateNewWidth({ containerRef, margin }),
  })

  const sortedData = getSortedData(data)
  const maxCalculatedPoint = Math.round(sortedData[0][1] * 1.25)
  const tickStep = calculateTickStep(maxCalculatedPoint)

  const tickInterval = Math.ceil(maxCalculatedPoint / tickStep)
  const maxPoint = tickInterval * tickStep

  useEffect(() => {
    if (!svgRef.current) return
    const chart = initializeD3({ svgRef, chartRef, width, height, margin })

    addYAxisLabel({ chart, margin, title: "Number of times used" })
    addXAxisLabel({ chart, margin, width, height, title: "Combo" })

    const x = addXAxis({ chart, data: sortedData, width, height })
    const y = addYAxis({
      maxPoint,
      chart,
      tickFormat: d3.format("d"),
      tickValues: d3.range(0, maxPoint + 1, tickStep),
      height,
    })

    drawGrid({ chart, y, width })
    drawBars({ chart, data: sortedData, x, height })

    animateBars({ chart, height, y, delay: 30 })
  }, [data, sortedData, maxPoint, width])

  return (
    <ChartRoot title="Dribble Combos Used" subtitle="This chart shows how many times each combo was used">
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
