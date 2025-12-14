import BteCard from "@/components/cards/BteCard"

const cardsData = [
  // Removed /socials link - route does not exist
  {
    link: "/brands",
    title: "BTE Brands",
    description: "Explore opportunities.",
  },
  // Removed /stats link - stats are already displayed on this page
]

export default function BteCardsSection() {
  return (
    <div className="flex flex-col items-center gap-6 lg:flex-row">
      {cardsData.map((cardData) => (
        <BteCard key={cardData.link} {...cardData} />
      ))}
    </div>
  )
}
