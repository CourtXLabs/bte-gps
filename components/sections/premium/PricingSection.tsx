"use client"

import { STRIPE_START_PLAN_MONTHLY_LINK, STRIPE_START_PLAN_YEARLY_LINK } from "@/constants/pricing"
import usePricingPageStore from "@/stores/pricingPageStore"
import EnterprisePricingCard from "./EnterprisePricingCard"
import PricingCard from "./PricingCard"

const pricingCardsData = [
  {
    id: 1,
    title: "🏀 Rookie: Fan Access",
    subtitle: "General fans who want limited access to athlete stats and insights.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Access to basic athlete profiles and public stats",
      "Limited number of game highlights and basic game statistics.",
      "Viewing access to athlete fan engagement scores.",
    ],
    monthlyPaymentLink: "http://localhost:3000/auth/signup",
    yearlyPaymentLink: "http://localhost:3000/auth/signup",
    isDisabled: false,
  },
  {
    id: 2,
    title: "🏀 Starter: Enthusiast Access",
    subtitle: "Fans who want more in-depth interaction with athlete data.",
    monthlyPrice: 4.99,
    yearlyPrice: 44.91,
    features: [
      "All Free Tier features",
      "Access to gamified stats for chosen athletes",
      "In-depth highlight breakdowns for up to 5 games per month",
      "Basic level fan rewards and exclusive updates from selected athletes",
    ],
    monthlyPaymentLink: STRIPE_START_PLAN_MONTHLY_LINK,
    yearlyPaymentLink: STRIPE_START_PLAN_YEARLY_LINK,
    isDisabled: false,
  },
  {
    id: 3,
    title: "⭐ All-Star: Data Explorer",
    subtitle: "Devoted fans, high school and college coaches, local brand managers.",
    monthlyPrice: 14.99,
    yearlyPrice: 134.91,
    features: [
      "All Basic Tier features",
      "Full access to gamified data on multiple athletes",
      "Comprehensive highlight breakdowns for unlimited games",
      "Weekly data-driven insights and analysis",
      "Access to fan voting on certain aspects of athlete performance",
      "Moderate level fan rewards and brand offers",
    ],
    monthlyPaymentLink: "#",
    yearlyPaymentLink: "#",
    isDisabled: true,
  },
  {
    id: 4,
    title: "⭐ Hall of Famer: Team and Athlete Partner",
    subtitle: "Brand partners, sports scouts, training professionals, and large fan bases.",
    monthlyPrice: 99.99,
    yearlyPrice: 899.91,
    features: [
      "All Premium Tier features",
      "Customizable athlete data feeds (ideal for scouting and brand partnership analysis)",
      "Access to athlete data history, trends, and advanced performance analytics",
      "Higher-level fan engagement features, including early access to new content",
      "Enhanced rewards and brand-exclusive offers for fans",
      "Dedicated customer support",
    ],
    monthlyPaymentLink: "#",
    yearlyPaymentLink: "#",
    isDisabled: true,
  },
]

const enterprisePricingData = {
  title: "⭐ Enterprise Tier: Brand and Marketing Partner",
  subtitle: "National and regional brands, media organizations, sports teams, and institutions.",
  pricing: "Custom Pricing (based on engagement and data volume needs)",
  features: [
    "All Professional Tier features",
    "Real-time, interactive access to athlete data for campaigns",
    "Branded sponsorship opportunities in fan engagement tools",
    "Direct marketing insights and tools for brand engagement in college and high school regions",
    "Advanced support for customized data integrations and campaign analytics",
    "Access to exclusive, co-branded content options",
  ],
  ctaText: "Get in touch for pricing",
  link: "#",
}

interface Props {
  email: string
  currentPlanId: number
}

export default function PricingSection({ email, currentPlanId }: Props) {
  const { isYearly } = usePricingPageStore()

  return (
    <div className="mx-auto max-w-[84.5rem]">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-4">
        {pricingCardsData.map((pricingCardData) => (
          <PricingCard
            key={pricingCardData.id}
            {...pricingCardData}
            link={`${isYearly ? pricingCardData.yearlyPaymentLink : pricingCardData.monthlyPaymentLink}?${email && `prefilled_email=${email}`}`}
            isActive={currentPlanId === pricingCardData.id}
            isYearly={isYearly}
          />
        ))}
      </div>
      <EnterprisePricingCard {...enterprisePricingData} className="mt-6 w-full " />
    </div>
  )
}
