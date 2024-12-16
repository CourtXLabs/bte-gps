import Image from "next/image"
import InvertedCommaIcon from "../icons/InvertedCommaIcon"

interface Props {
  title?: React.ReactNode
  subtitle?: string
  text?: string
  image: string
  personName?: string
  personDescription?: string
}

export default function TestimonialSection({ title, subtitle, text, image, personName, personDescription }: Props) {
  return (
    <div className="px-6 py-20 lg:py-24">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="flex-1">
          {title && <h2 className="mb-12 text-4xl font-bold lg:text-5xl">{title}</h2>}
          <InvertedCommaIcon className="h-8 w-10 fill-[#cbd5e1]" />
          <h3 className="mt-12 text-2xl font-medium">{subtitle}</h3>
          <p className="mt-9 text-xl opacity-70">{text}</p>
        </div>
        <div className="relative h-[400px] w-full rounded-2xl md:w-[500px] lg:h-[500px] lg:w-[400px] xl:w-[600px]">
          <Image src={image} fill alt={personName || "Testimonial image"} className="rounded-2xl object-cover" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent from-70% to-black" />
          <div className="absolute bottom-6 left-8 z-10">
            <p className="text-xl font-semibold">{personName}</p>
            <p className="text-sm opacity-70">{personDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
