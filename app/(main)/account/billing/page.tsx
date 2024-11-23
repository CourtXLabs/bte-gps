import { buttonVariants } from "@/components/ui/button"
import { STRIPE_CUSTOMER_PORTAL_LINK } from "@/constants/pricing"
import { getUserEmail } from "@/lib/auth"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default async function AccountBillingPage() {
  const userEmail = await getUserEmail()

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Billing Information</h1>
      <Link
        target="_blank"
        href={`${STRIPE_CUSTOMER_PORTAL_LINK}?prefilled_email=${userEmail}`}
        className={cn(buttonVariants({ size: "xl" }), "text-base")}
      >
        Change your plan
      </Link>
    </div>
  )
}
