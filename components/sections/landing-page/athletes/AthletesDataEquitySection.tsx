import { Button } from "@/components/ui/button"
import AthletesDataEquityListItem from "./AthletesDataEquityListItem"

const dataEquityItems = [
  {
    number: "01",
    title: "Innovative Analytics Platform",
    description:
      "Designed by athletes, for athletes. BTE Analytics empowers you to control and monetize your data effectively.",
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
    <div className="mt-24 w-full rounded-3xl bg-primary p-16 text-primary-foreground">
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <h2 className="text-4xl font-medium">True Data Equity for Athletes</h2>
          <p className="text-lg">Empowering Athletes with Game-Changing Data & Revenue Opportunities</p>
        </div>
        <Button className="h-16 rounded-full bg-primary-foreground px-8 text-sm font-medium text-white hover:bg-gray-900">
          Join the Data Revolution
        </Button>
      </div>
      <ol className="mt-8 flex items-center gap-12">
        {dataEquityItems.map((item, index) => (
          <AthletesDataEquityListItem
            key={item.number}
            number={item.number}
            title={item.title}
            description={item.description}
          />
        ))}
      </ol>
    </div>
  )
}
