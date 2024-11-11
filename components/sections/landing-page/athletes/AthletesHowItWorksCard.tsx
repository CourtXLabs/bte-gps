import GradientBorderCard from "@/components/cards/GradientBorderCard"
import Image from "next/image"

interface Props {
  title: string
  description: string
  image: string
}

export default function AthletesHowItWorksCard({ title, description, image }: Props) {
  return (
    <GradientBorderCard>
      <h3 className="text-4xl tracking-tight">{title}</h3>
      <p className="pb-10 pt-2.5 opacity-70">{description}</p>
      <div className="relative mt-auto h-[240px] ">
        <Image src={image} alt={title} fill className="absolute object-contain" sizes="100%" />
      </div>
    </GradientBorderCard>
  )
}
