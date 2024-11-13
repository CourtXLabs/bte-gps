import Image from "next/image"

export default function FansFounderMessageSection() {
  return (
    <div className="relative pb-8 pt-10 lg:pb-20 lg:pt-24">
      <Image fill className="absolute object-cover" src="/founder-message-bg.png" alt="Founder Message" />
      <div className="relative mx-auto max-w-2xl">
        <h2 className="text-center text-4xl font-bold lg:text-5xl">Message from the founder</h2>
        <p className="mt-6 text-center opacity-70 lg:mt-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam veritatis eum, dolorem magni vitae quasi rem
          nesciunt dolore, iste deleniti velit dignissimos aliquam nisi rerum laboriosam? Numquam suscipit natus enim?
        </p>
      </div>
    </div>
  )
}
