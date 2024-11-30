import Image from "next/image"

interface Props {
  title: string
  description: string
  image: string
}

export default function AthletesHowItWorksCard({ title, description, image }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2 text-center">
      <Image src={image} alt={title} height={112} width={112} />
      <h3 className="text-4xl tracking-tight">{title}</h3>
      <p className="pb-10 pt-2.5 text-[#94a3b8]">{description}</p>
    </div>
  )
}
