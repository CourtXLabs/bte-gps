import { buttonVariants } from "@/components/ui/button"
import { getUserEmail } from "@/lib/auth"
import { cn } from "@/lib/utils"
import Link from "next/link"

const billingInfoLink = "https://billing.stripe.com/p/login/test_cN2bKffUqalD03S144"

export default function AccountBillingPage() {
  const userEmail = getUserEmail()

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Billing Information</h1>
      <Link
        target="_blank"
        href={`${billingInfoLink}?prefilled_email=${userEmail}`}
        className={cn(buttonVariants({ size: "xl" }), "text-base")}
      >
        Change your plan
      </Link>
    </div>
  )
}
