import { useEffect, useState } from "react"

interface Props {
  containerRef: React.RefObject<HTMLDivElement>
  initialWidth?: number
  calculateNewWidth: (containerRef: React.RefObject<HTMLDivElement>) => number
}

function useResize({ containerRef, initialWidth = 600, calculateNewWidth }: Props) {
  const [width, setWidth] = useState(initialWidth)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(calculateNewWidth(containerRef))
      }
    }

    handleResize() // Set initial width
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [containerRef])

  return width
}

export default useResize
