import LandingPageWhiteButton from "@/components/buttons/LandingPageWhiteButton"
import Image from "next/image"

export default function AboutUsStory() {
  return (
    <div className="bg-black px-6 2xl:px-0">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-10 py-20 lg:flex-row lg:gap-20 lg:py-24">
        <div className="relative h-[400px] w-full lg:h-[587px] lg:w-[625px] lg:flex-1">
          <Image
            src="/landing-page/about-us-empowering.png"
            fill
            className="absolute object-contain"
            alt="Image Collage"
          />
        </div>
        <div className="lg:flex-1">
          <h2 className="text-4xl font-semibold lg:text-5xl">
            The Story Behind <span className="text-primary">BTE Analytics</span>
          </h2>
          <p className="mt-8 text-lg opacity-80">
            We are a team of former athletes who have experienced firsthand the struggles of training hard and competing
            at our best, only to see our performance data go underutilized. We created BTE Analytics to change that. Our
            platform is designed to help athletes profit from their hard work and dedication, turning their performance
            into a sustainable income stream while improving their skills through powerful data analytics.
          </p>
          <LandingPageWhiteButton href="/contact-us" className="mt-11">
            Contact Us Now
          </LandingPageWhiteButton>
        </div>
      </div>
    </div>
  )
}
