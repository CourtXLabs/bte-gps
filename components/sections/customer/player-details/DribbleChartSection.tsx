import Image from "next/image"

interface Props {
  src: string
}

export default function DribbleChartSection({ src }: Props) {
  return (
    <div className="mx-auto flex-1">
      <Image src={src} alt="Dribble Graph" width={800} height={380} />
    </div>
  )
}
