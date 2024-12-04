import Image from "next/image"

const cardsData = [
  {
    title: "Unlock Insider Knowledge",
    description:
      "Get exclusive access to advanced stats and highlights. Dive into the details behind the game and connect with your favorite athletes like never before.",
    image: "/landing-page/fans-insider-knowledge.png",
  },
  {
    title: "Enjoy Exclusive Perks",
    description:
      "From merchandise discounts to early access to special offers, your subscription comes with unique benefits.",
    image: "/landing-page/fans-exclusive-perks.png",
  },
  {
    title: "Empower the Athletes You Love",
    description:
      "Your subscription directly helps athletes earn income from their performance data and achieve greatness.",
    image: "/landing-page/fans-empower-athletes.png",
  },
]

export default function FansValuePropositionSection() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-20 lg:py-24">
      <h2 className="text-center text-4xl font-bold tracking-tighter lg:text-5xl">What You Get as a Fan</h2>
      <h3 className="mx-auto max-w-[33.375rem] pt-4 text-center text-lg opacity-70 ">
        More than a spectator—be a part of their success story
      </h3>
      <div className="flex w-full flex-col gap-4 pt-10 lg:flex-row lg:gap-10">
        {cardsData.map((card) => (
          <div key={card.title} className="flex flex-1 flex-col items-center gap-2 text-center">
            <Image src={card.image} alt={card.title} width={112} height={112} />
            <h3 className="text-2xl font-semibold">{card.title}</h3>
            <p className="text-[#94a3b8]">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
