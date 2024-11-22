import CheckIcon from "@/components/icons/CheckIcon"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Props {
  title: string
  subtitle: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  link: string
  isDisabled?: boolean
  isYearly?: boolean
}

export default function PricingCard({
  title,
  subtitle,
  isYearly,
  monthlyPrice,
  yearlyPrice,
  features,
  link,
  isDisabled,
}: Props) {
  return (
    <div
      className={cn("flex flex-col rounded-[4px] border border-[#D0D5DD] px-6 pb-8 pt-10", {
        "pointer-events-none opacity-30": isDisabled,
      })}
    >
      <h3 className="pb-2 text-2xl font-bold">{title}</h3>
      <p className="pb-5">{subtitle}</p>
      <p className="pb-14 font-light">
        <span className="text-4xl font-semibold">${isYearly ? yearlyPrice : monthlyPrice}</span> /{" "}
        {isYearly ? "Year" : "Month"}
      </p>
      <ul className="space-y-3 pb-10 pl-0">
        {features.map((feature) => (
          <li className="flex items-center gap-4 py-1.5" key={feature}>
            <div className="flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-primary text-black">
              <CheckIcon className="w-3 min-w-3" />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto w-full">
        {isDisabled && <p className="pb-3 text-center">Coming soon...</p>}
        <Link
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "w-full rounded-sm border-primary text-base font-normal text-primary hover:bg-primary hover:text-primary-foreground",
          )}
          href={link}
        >
          Get Started Now
        </Link>
      </div>
    </div>
  )
}
