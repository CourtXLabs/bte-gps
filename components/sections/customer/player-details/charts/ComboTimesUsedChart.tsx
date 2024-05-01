"use client"

import { ComboToPointData } from "@/types"
import * as d3 from "d3"
import { useEffect, useRef } from "react"

const PRIMARY_COLOR = "#FCBE22"

interface Props {
  data: ComboToPointData[]
}

export default function ComboTimesUsedChart({ data }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
  }, [data])

  return (
    <svg
      id="combo-to-point"
      ref={svgRef}
      className="h-[500px] w-[500px]"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    />
  )
}
