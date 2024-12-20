import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { STRIPE_CUSTOMER_PORTAL_LINK } from "@/constants/pricing"
import { getIsPremium, getUserEmail } from "@/lib/auth"
import { cn } from "@/lib/utils"
import Link from "next/link"

const getPlan = (isPremium: boolean) => {
  return isPremium ? "🏀 Starter: Enthusiast Access" : "🏀 Rookie: Fan Access"
}

export default async function AccountBillingPage() {
  const userEmail = await getUserEmail()
  const isPremium = await getIsPremium()

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Billing Information</h1>
      <Card className="w-max pt-6">
        <CardContent>{getPlan(isPremium)}</CardContent>
      </Card>
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
