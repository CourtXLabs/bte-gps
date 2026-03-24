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
      {/* Same aspect-ratio container as YouTubePlaylist (pb-[53.9%]) so heights match */}
      <div className="relative w-full pb-[53.9%]">
        <Image
          src={src}
          alt="Dribble Graph"
          fill
          className={cn("object-contain", { blur: !isPremium })}
        />
      </div>
      {!isPremium && <GoPremiumCard />}
    </div>
  )
}
