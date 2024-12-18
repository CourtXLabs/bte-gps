import GradientBorderCard from "@/components/cards/GradientBorderCard"
import Image from "next/image"
import Link from "next/link"

const cardsData = [
  {
    title: "Join as a Fan",
    text: "Fans looking for unique basketball analytics insights",
    image: "/landing-page/landing-page-fans.png",
    link: "/fans",
  },
  {
    title: "Join as an Athlete",
    text: "Athletes seeking performance analytics and sponsorships",
    image: "/landing-page/landing-page-athletes.png",
    link: "/athletes",
  },
  {
    title: "Join as a Brand",
    text: "Brands looking for sponsorship and engagement",
    image: "/landing-page/landing-page-brands.png",
    link: "/brands",
  },
]

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-screen-xl space-y-11 py-20">
      <div className="mx-auto max-w-screen-lg space-y-8">
        <h1 className="text-center text-4xl font-extrabold lg:text-5xl">
          Empowering <span className="text-primary">Athletes, Engaging Brands</span>, Enhancing Sports Performance
        </h1>
        <p className="mx-auto text-center lg:max-w-xl">
          BTE Analytics revolutionizes how athletes and brands interact with performance data, creating growth
          opportunities for everyone involved.
        </p>
      </div>
      <div className="flex flex-col gap-5 lg:flex-row">
        {cardsData.map((card) => (
          <GradientBorderCard className="flex-1 space-y-11 bg-opacity-30 p-4" key={card.title}>
            <div className="space-y-2 px-5 pt-4 text-center">
              <h2 className="text-3xl">{card.title}</h2>
              <h3 className="opacity-70">{card.text}</h3>
              <Link href={card.link} className="block text-primary underline">
                See more
              </Link>
            </div>
            <Link href={card.link}>
              <Image height={410} width={430} src={card.image} alt={card.title} />
            </Link>
          </GradientBorderCard>
        ))}
      </div>
    </main>
  )
}
