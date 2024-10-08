import { getIsPremium, getUserEmail } from "@/lib/auth"
import Link from "next/link"

export default async function PremiumPage() {
  const email = await getUserEmail()
  const isPremium = await getIsPremium()

  if (isPremium) {
    return <div>Thank you for being a premium user!</div>
  }

  return (
    <div>
      Enjoy premium benefits!
      <Link href={`https://buy.stripe.com/test_eVa3f9cf41iiciQaEE?prefilled_email=${email}`}>Upgrade to premium</Link>
    </div>
  )
}
