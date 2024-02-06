"use client"

import { useEffect, useRef } from "react"

const drawMarker = (x: number, y: number, ctx: CanvasRenderingContext2D | null) => {
  if (ctx) {
    const lineLength = 10 // Length of each half line of the 'X'
    ctx.beginPath()
    // First line (\)
    ctx.moveTo(x - lineLength, y - lineLength)
    ctx.lineTo(x + lineLength, y + lineLength)
    // Second line (/)
    ctx.moveTo(x + lineLength, y - lineLength)
    ctx.lineTo(x - lineLength, y + lineLength)

    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.closePath()
  }
}

const CourtCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return () => {}
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = 850
    canvas.height = 458

    const image = new Image()
    image.src = "court.webp"
    image.onload = () => {
      const scaleWidth = canvas.width
      const scaleHeight = canvas.height

      ctx?.drawImage(image, 0, 0, scaleWidth, scaleHeight)
    }

    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      drawMarker(x, y, ctx)
    }

    canvas.addEventListener("click", handleCanvasClick)

    return () => {
      canvas.removeEventListener("click", handleCanvasClick)
    }
  }, [])

  return <canvas ref={canvasRef} />
}

export default CourtCanvas
