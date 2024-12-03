import { Button } from "@/components/ui/button"
import AthletesDataEquityListItem from "./AthletesDataEquityListItem"

const dataEquityItems = [
  {
    number: "01",
    title: "Innovative Analytics Platform",
    description: "1st of its kind player performance monetization platform designed by athletes for athletes",
  },
  {
    number: "02",
    title: "Revenue & Growth Opportunities",
    description:
      "Transform your athletic performance into revenue through fan subscriptions, brand deals, and targeted ad opportunities.",
  },
  {
    number: "03",
    title: "Interactive Engagement",
    description:
      "Brands and fans access your performance data, enhancing engagement and building your brand exposure effectively.",
  },
]

export default function AthletesDataEquitySection() {
  return (
    <div className="mx-auto mb-20 mt-20 w-full max-w-screen-xl px-6 text-primary-foreground lg:mb-24 lg:mt-24 2xl:px-0">
      <div className="rounded-3xl bg-primary p-8 lg:p-16">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="space-y-4">
            <h2 className="text-4xl font-medium">True Data Equity for Athletes</h2>
            <p className="text-lg">Empowering Athletes with Game-Changing Data & Revenue Opportunities</p>
          </div>
          <Button className="h-16 w-full rounded-full bg-primary-foreground px-8 text-sm font-medium text-white hover:bg-gray-900 md:w-auto">
            Join the Data Revolution
          </Button>
        </div>
        <ol className="mt-8 flex flex-col items-start gap-12 md:flex-row">
          {dataEquityItems.map((item) => (
            <AthletesDataEquityListItem
              key={item.number}
              number={item.number}
              title={item.title}
              description={item.description}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}
