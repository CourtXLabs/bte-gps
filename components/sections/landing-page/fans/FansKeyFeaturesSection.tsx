import DatabaseIcon from "@/components/icons/DatabaseIcon"
import FansIcon from "@/components/icons/FansIcon"
import HandshakeIcon from "@/components/icons/HandshakeIcon"
import QuestionScribbleIcon from "@/components/icons/QuestionScribbleIcon"

const items = [
  {
    title: "Player Performance Analysis",
    description: "Get real-time data on athlete performance.",
    icon: <QuestionScribbleIcon />,
  },
  {
    title: "Data Monetization",
    description: "Turn your performance stats into revenue.",
    icon: <DatabaseIcon />,
  },
  {
    title: "Brand-Athlete Partnerships",
    description: "Connect with top athletes to promote your brand.",
    icon: <HandshakeIcon />,
  },
  {
    title: "Fan Engagement",
    description: "Allow fans to subscribe and support athletes directly.",
    icon: <FansIcon />,
  },
]

export default function FansKeyFeaturesSection() {
  return (
    <div className="mx-auto my-10 max-w-screen-xl px-6 lg:my-24">
      <h2 className="text-center text-4xl font-bold tracking-tighter lg:text-5xl">Our Key Features</h2>
      <h3 className="mx-auto pt-6 text-center text-lg opacity-70 lg:pt-8">
        From performance analysis to brand engagement, our platform is built for growth.
      </h3>
      <div className="flex flex-col gap-6 pt-8 lg:flex-row lg:pt-11">
        {items.map((item) => (
          <div className="flex flex-col items-center gap-3.5 text-center" key={item.title}>
            {item.icon}
            <h3 className="pt-2 text-2xl font-semibold">{item.title}</h3>
            <p className="opacity-70">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
