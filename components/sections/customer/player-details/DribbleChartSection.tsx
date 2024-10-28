import GoPremiumCard from "@/components/cards/GoPremiumCard"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Props {
  src: string
  isPremium?: boolean
}

export default function DribbleChartSection({ src, isPremium }: Props) {
  return (
    <div className="relative mx-auto flex-1">
      <Image src={src} alt="Dribble Graph" width={800} height={380} className={cn({ blur: !isPremium })} />
      {!isPremium && <GoPremiumCard />}
    </div>
  )
}
