import CheckIcon from "@/components/icons/CheckIcon"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Props {
  title: string
  subtitle: string
  pricing: string
  ctaText: string
  features: string[]
  link: string
  className?: string
}

export default function EnterprisePricingCard({ title, subtitle, pricing, ctaText, features, link, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-10 rounded-[4px] border border-[#D0D5DD] px-6 pb-8 pt-10 lg:flex-row lg:gap-24",
        className,
      )}
    >
      <div className="flex flex-col lg:max-w-80">
        <h3 className="pb-3 text-2xl font-bold">{title}</h3>
        <p className="pb-2">{subtitle}</p>
        <p className="pb-4">{pricing}</p>
        <Link
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "mt-auto hidden rounded-sm border-primary text-base font-normal text-primary hover:bg-primary hover:text-primary-foreground lg:flex",
          )}
          href={link}
        >
          {ctaText}
        </Link>
      </div>
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
      <Link
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "mt-auto flex rounded-sm border-primary text-base font-normal text-primary hover:bg-primary hover:text-primary-foreground lg:hidden",
        )}
        href={link}
      >
        {ctaText}
      </Link>
    </div>
  )
}
