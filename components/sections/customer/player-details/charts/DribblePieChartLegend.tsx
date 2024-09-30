"use client"

import { dribbleOptions } from "@/constants/sequence-options"
import Image from "next/image"

export default function DribblePieChartLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {dribbleOptions.map((option) => (
        <Image key={option.id} src={option.image!} alt={option.name} width={125} height={125} />
      ))}
    </div>
  )
}
