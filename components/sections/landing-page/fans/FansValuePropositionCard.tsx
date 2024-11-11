import GradientBorderCard from "@/components/cards/GradientBorderCard"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface Props {
  title: string
  description: string
  image: string
  link: string
  linkText: string
}

export default function FansValuePropositionCard({ title, description, image, link, linkText }: Props) {
  return (
    <GradientBorderCard className="items-center text-center">
      <h3 className="text-3xl tracking-tight lg:text-4xl">{title}</h3>
      <p className="pb-4 pt-2.5 opacity-70">{description}</p>
      <Link href={link} className={cn(buttonVariants({ variant: "link" }), "h-auto p-0 text-base")}>
        {linkText}
      </Link>
      <div className="relative mt-6 h-[240px] w-full">
        <Image src={image} alt={title} fill className="absolute object-contain" sizes="100%" />
      </div>
    </GradientBorderCard>
  )
}
