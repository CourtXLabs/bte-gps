import { Margin } from "@/types"

interface Props {
  containerRef: React.RefObject<HTMLDivElement>
  margin: Margin
}

const calculateNewWidth = ({ containerRef, margin }: Props) => {
  if (!containerRef.current) return 0
  return containerRef.current.clientWidth - margin.left - margin.right
}

export default calculateNewWidth
