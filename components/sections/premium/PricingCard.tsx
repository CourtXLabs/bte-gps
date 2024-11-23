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
  isActive?: boolean
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
  isActive,
}: Props) {
  return (
    <div
      className={cn("flex flex-col rounded-[4px] border border-[#D0D5DD] px-6 pb-8 pt-10", {
        "pointer-events-none opacity-30": isDisabled,
      })}
    >
      <h3 className="pb-2 text-2xl font-bold  2xl:h-[4.5rem]">{title}</h3>
      <p className="pb-5 lg:h-[4.25rem] 2xl:h-[5.75rem]">{subtitle}</p>
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
        {isActive && <p className="pb-3 text-center text-lg font-medium text-primary">Currently active</p>}
        <Link
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "w-full rounded-sm border-primary text-base font-normal text-primary hover:bg-primary hover:text-primary-foreground",
            { "pointer-events-none opacity-30": isActive },
          )}
          rel="noreferer"
          target="_blank"
          href={link}
        >
          Get Started Now
        </Link>
      </div>
    </div>
  )
}
