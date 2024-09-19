"use client"

import { CardContent } from "@/components/ui/card"
import useResize from "@/hooks/useResize"
import addXAxis from "@/utils/charts/addXAxis"
import addXAxisLabel from "@/utils/charts/addXAxisLabel"
import addYAxisLabel from "@/utils/charts/addYAxisLabel"
import addYAxis from "@/utils/charts/addYaxis"
import animateBars from "@/utils/charts/animateBars"
import calculateNewWidth from "@/utils/charts/calculateNewWidth"
import drawBars from "@/utils/charts/drawBars"
import drawGrid from "@/utils/charts/drawGrid"
import initializeD3 from "@/utils/charts/initializeD3"
import { useEffect, useRef } from "react"
import ChartRoot from "./ChartRoot"

const margin = { top: 48, right: 50, bottom: 70, left: 30 }
const height = 500 - margin.top - margin.bottom

interface Props {
  data: Record<string, number>
  title: string
  subtitle: string
  xAxisLabel: string
  yAxisLabel: string
}

export default function SequenceFrequencyChart({ data, title, subtitle, xAxisLabel, yAxisLabel }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const chartRef = useRef<SVGGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const width = useResize({
    containerRef,
    calculateNewWidth: (containerRef) => calculateNewWidth({ containerRef, margin }),
  })

  const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1])
  const maxPoint = Math.round(Math.max(...Object.values(data)) * 1.25)

  useEffect(() => {
    if (!svgRef.current) return
    const chart = initializeD3({ svgRef, chartRef, width, height, margin })

    addXAxisLabel({ chart, margin, width, height, title: xAxisLabel })
    addYAxisLabel({ chart, margin, title: yAxisLabel })

    const x = addXAxis({ chart, data: sortedData, width, height })
    const y = addYAxis({
      maxPoint,
      chart,
      height,
    })

    drawGrid({ chart, y, width })
    drawBars({ chart, data: sortedData, x, height })
    animateBars({ chart, height, y, delay: 100 })
  }, [data, maxPoint, title, xAxisLabel, sortedData, yAxisLabel])

  return (
    <ChartRoot title={title} subtitle={subtitle}>
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
