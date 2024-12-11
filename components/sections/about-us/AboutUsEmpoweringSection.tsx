import LandingPageWhiteButton from "@/components/buttons/LandingPageWhiteButton"
import Image from "next/image"

export default function AboutUsEmpoweringSection() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between  px-6 pb-10 lg:flex-row lg:pb-24 2xl:px-0">
      <div className="order-2 w-full space-y-8 lg:order-none lg:w-1/2">
        <h2 className="text-4xl font-semibold lg:text-5xl">
          Empowering <span className="text-primary">Athletes</span> to Own Their Data
        </h2>

        <p className="text-lg opacity-80">
          At BTE Analytics, we aim to reshape the sports industry by giving athletes control over their performance
          data. With our platform, athletes can transform their stats into meaningful opportunities—whether for income,
          growth, or connecting with fans and brands.
        </p>

        <div className="flex flex-col gap-3 pt-2.5 sm:flex-row">
          <LandingPageWhiteButton href="/contact-us">Contact Us Now</LandingPageWhiteButton>
        </div>
      </div>
      <div className="relative mb-10 h-[400px] w-full lg:mb-0 lg:h-[645px] lg:w-[645px]">
        <Image src="/landing-page/empowering-athletes.png" alt="Athletes" fill className="absolute object-contain" />
      </div>
    </div>
  )
}
