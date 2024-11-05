import AthletesHowItWorksCard from "./AthletesHowItWorksCard"

const cardsData = [
  {
    title: "Take Ownership",
    description:
      "Sign up and connect your athletic profile to BTE Analytics. Begin tracking and claiming your stats to build your data profile.",
    image: "/landing-page/athlete-take-ownership.png",
  },
  {
    title: "Highlight Your Value",
    description:
      "Use our proprietary technology to showcase your skills, performance highlights, and value in the marketplace to brands and fans.",
    image: "/landing-page/athlete-highlight-your-value.png",
  },
  {
    title: "Monetize & Earn",
    description:
      "Monetize your data through brand partnerships, exclusive fan content, and royalty management. Start earning from your performance metrics.",
    image: "/landing-page/athlete-monetize-earn.png",
  },
]

export default function AthletesHowItWorksSection() {
  return (
    <div className="mt-24">
      <h2 className="text-center text-5xl font-bold tracking-tighter">How It Works</h2>
      <div className="flex w-full gap-4 pt-6">
        {cardsData.map((card) => (
          <AthletesHowItWorksCard
            key={card.title}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
    </div>
  )
}
