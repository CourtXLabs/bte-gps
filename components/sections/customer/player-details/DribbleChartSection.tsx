import Image from "next/image"

export default function DribbleChartSection() {
  return (
    <div className="flex-1">
      <Image src="/example-dribble-graph.png" alt="Dribble Graph" width={800} height={380} />
    </div>
  )
}
