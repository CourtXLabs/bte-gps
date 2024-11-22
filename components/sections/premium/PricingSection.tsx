import { getUserEmail } from "@/lib/auth"
import EnterprisePricingCard from "./EnterprisePricingCard"
import PricingCard from "./PricingCard"

const pricingCardsData = [
  {
    title: "🏀 Rookie: Fan Access",
    subtitle: "General fans who want limited access to athlete stats and insights.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Access to basic athlete profiles and public stats",
      "Limited number of game highlights and basic game statistics.",
      "Viewing access to athlete fan engagement scores.",
    ],
    link: "https://buy.stripe.com/test_eVa3f9cf41iiciQaEE",
    isDisabled: false,
  },
  {
    title: "🏀 Starter: Enthusiast Access",
    subtitle: "Fans who want more in-depth interaction with athlete data.",
    monthlyPrice: 4.99,
    yearlyPrice: 59.88,
    features: [
      "All Free Tier features",
      "Access to gamified stats for chosen athletes",
      "In-depth highlight breakdowns for up to 5 games per month",
      "Basic level fan rewards and exclusive updates from selected athletes",
    ],
    link: "https://buy.stripe.com/test_eVa3f9cf41iiciQaEE",
    isDisabled: false,
  },
  {
    title: "⭐ All-Star: Data Explorer",
    subtitle: "Devoted fans, high school and college coaches, local brand managers.",
    monthlyPrice: 14.99,
    yearlyPrice: 179.88,
    features: [
      "All Basic Tier features",
      "Full access to gamified data on multiple athletes",
      "Comprehensive highlight breakdowns for unlimited games",
      "Weekly data-driven insights and analysis",
      "Access to fan voting on certain aspects of athlete performance",
      "Moderate level fan rewards and brand offers",
    ],
    link: "https://buy.stripe.com/test_eVa3f9cf41iiciQaEE",
    isDisabled: true,
  },
  {
    title: "⭐ Hall of Famer: Team and Athlete Partner",
    subtitle: "Brand partners, sports scouts, training professionals, and large fan bases.",
    monthlyPrice: 99.99,
    yearlyPrice: 1199.88,
    features: [
      "All Premium Tier features",
      "Customizable athlete data feeds (ideal for scouting and brand partnership analysis)",
      "Access to athlete data history, trends, and advanced performance analytics",
      "Higher-level fan engagement features, including early access to new content",
      "Enhanced rewards and brand-exclusive offers for fans",
      "Dedicated customer support",
    ],
    link: "https://buy.stripe.com/test_eVa3f9cf41iiciQaEE",
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

export default async function PricingSection() {
  const email = await getUserEmail()

  return (
    <div className="mx-auto max-w-[84.5rem]">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-4">
        {pricingCardsData.map((pricingCardData) => (
          <PricingCard {...pricingCardData} link={`${pricingCardData.link}?prefilled_email=${email}`} />
        ))}
      </div>
      <EnterprisePricingCard {...enterprisePricingData} className="mt-6 w-full " />
    </div>
  )
}
