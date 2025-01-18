import LandingPageWhiteButton from "@/components/buttons/LandingPageWhiteButton"

export default function FansHeroSection() {
  return (
    <div className="bg-black bg-cover px-6 pb-20 pt-12 lg:bg-[url(/landing-page/hero-bg.png)] lg:pb-28 lg:pt-28 2xl:px-0">
      <div className="mx-auto flex max-w-screen-xl flex-col items-start  justify-between gap-14 lg:flex-row">
        <div className="order-2 w-full flex-1 space-y-7 lg:order-none lg:w-1/2 lg:max-w-xl">
          <h1 className="text-4xl font-medium lg:text-5xl">
            Support, Engage, and <span className="font-bold text-primary">Dive Deeper</span> with Your Favorite Athletes
          </h1>
          <p>
            Experience sports like never before. Dive into gamified stats, uncover hidden insights, and directly empower
            the athletes who inspire you.
          </p>
          <LandingPageWhiteButton href="/premium">Join the Fan Community</LandingPageWhiteButton>
        </div>
      </div>
    </div>
  )
}
