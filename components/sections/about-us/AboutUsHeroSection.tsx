import LandingPageWhiteButton from "@/components/buttons/LandingPageWhiteButton"

export default function AboutUsHeroSection() {
  return (
    <div className="relative bg-black">
      {/* <Image
        src="/landing-page/about-us-hero-background.png"
        alt="Key Features Background"
        fill
        className="absolute object-cover"
      /> */}
      <div className="mx-auto flex max-w-xl flex-col items-center py-20 xl:pb-36 xl:pt-24">
        <h1 className="relative text-center text-4xl font-extrabold lg:text-5xl">
          Empowering <span className="text-primary">Athletes</span>. <br />
          Engaging <span className="text-primary">Fans</span>.
        </h1>
        <p className="relative mt-8 text-center">
          At BTE Analytics, we provide athletes with the tools to own, control, and profit from their performance data.
        </p>
        <LandingPageWhiteButton href="/contact-us" className="relative mt-11">
          Get in touch
        </LandingPageWhiteButton>
      </div>
    </div>
  )
}
