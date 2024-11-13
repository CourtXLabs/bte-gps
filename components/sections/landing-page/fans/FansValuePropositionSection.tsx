import FansValuePropositionCard from "./FansValuePropositionCard"

const cardsData = [
  {
    title: "Exclusive Insights",
    description: "Get access to player stats, highlights, and performance data.",
    image: "/landing-page/athlete-take-ownership.png",
    link: "/about-us",
    linkText: "Discover More",
  },
  {
    title: "Monetize Your Data",
    description: "Take control of your performance data to build your brand and generate revenue.",
    image: "/landing-page/athlete-highlight-your-value.png",
    link: "/about-us",
    linkText: "Learn More",
  },
  {
    title: "Engage with Talent",
    description: "Leverage athlete performance data to create targeted brand partnerships.",
    image: "/landing-page/athlete-monetize-earn.png",
    link: "/about-us",
    linkText: "Partner with Us",
  },
]

export default function FansValuePropositionSection() {
  return (
    <div className="mx-auto mt-10 max-w-screen-xl px-6 lg:mt-20">
      <h2 className="text-center text-4xl font-bold tracking-tighter lg:text-5xl">What BTE Analytics Does</h2>
      <h3 className="mx-auto max-w-[33.375rem] pt-6 text-center text-lg opacity-70 lg:pt-8">
        We provide a platform where data drives opportunities for athletes and brands to connect and grow.
      </h3>
      <div className="flex w-full flex-col gap-4 pt-6 lg:flex-row lg:pt-8">
        {cardsData.map((card) => (
          <FansValuePropositionCard
            key={card.title}
            title={card.title}
            description={card.description}
            image={card.image}
            link={card.link}
            linkText={card.linkText}
          />
        ))}
      </div>
    </div>
  )
}
