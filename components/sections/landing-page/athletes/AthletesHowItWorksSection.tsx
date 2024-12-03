import LandingPageWhiteButton from "@/components/buttons/LandingPageWhiteButton"
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
    <div className="bg-black py-20 lg:py-24">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center px-6 2xl:px-0">
        <h2 className="text-center text-5xl font-bold tracking-tighter">How It Works</h2>
        <div className="flex w-full max-w-lg flex-col items-center gap-4 pt-10 lg:max-w-none lg:flex-row lg:pt-20">
          {cardsData.map((card) => (
            <AthletesHowItWorksCard
              key={card.title}
              title={card.title}
              description={card.description}
              image={card.image}
            />
          ))}
        </div>
        <LandingPageWhiteButton href="#">Join as an athlete</LandingPageWhiteButton>
      </div>
    </div>
  )
}
