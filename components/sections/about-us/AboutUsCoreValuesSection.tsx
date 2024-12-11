import LandingPageWhiteButton from "@/components/buttons/LandingPageWhiteButton"
import Image from "next/image"

export default function AboutUsCoreValuesSection() {
  return (
    <div className="bg-black py-20 lg:py-24">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center space-y-11">
        <div className="mx-auto space-y-4">
          <h2 className="text-bold text-center text-4xl lg:text-5xl">Our Core Values</h2>
          <p className="text-center text-lg opacity-80">Integrity, Innovation, Empowerment</p>
        </div>
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-4">
          <div className="flex max-w-lg flex-1 flex-col items-center gap-2">
            <Image width={112} height={112} src="/landing-page/about-us-lightbulb.png" alt="Lightbulb" />
            <h3 className="text-2xl font-semibold">Integrity</h3>
            <p className="text-center text-[#94a3b8]">
              We believe in transparency and fairness. Athletes should always have control over their data and its use.
            </p>
          </div>
          <div className="flex max-w-lg flex-1 flex-col items-center gap-2">
            <Image width={112} height={112} src="/landing-page/about-us-law.png" alt="Innovation" />
            <h3 className="text-2xl font-semibold">Innovation</h3>
            <p className="text-center text-[#94a3b8]">
              We are continuously pushing the boundaries of what’s possible, using cutting-edge technology to provide
              athletes with new opportunities.
            </p>
          </div>
          <div className="flex max-w-lg flex-1 flex-col items-center gap-2">
            <Image width={112} height={112} src="/landing-page/about-us-empowerment.png" alt="Empowerment" />
            <h3 className="text-2xl font-semibold">Empowerment</h3>
            <p className="text-center text-[#94a3b8]">
              Athletes deserve to be the decision-makers of their own data. Our platform gives them the tools to
              succeed.
            </p>
          </div>
        </div>
        <LandingPageWhiteButton href="/premium">Join as a fan</LandingPageWhiteButton>
      </div>
    </div>
  )
}
