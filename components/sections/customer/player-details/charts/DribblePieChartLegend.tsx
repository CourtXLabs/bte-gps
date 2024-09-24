"use client"

import { dribbleOptions } from "@/constants/sequence-options"
import Image from "next/image"

export default function DribblePieChartLegend() {
  return (
    <div className="flex items-center justify-center">
      {dribbleOptions.map((option) => (
        <Image key={option.id} src={option.image!} alt={option.name} width={125} height={125} />
      ))}
    </div>
  )
}
