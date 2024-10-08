import { getUserEmail } from "@/lib/auth"

const billingInfoLink = "https://billing.stripe.com/p/login/test_cN2bKffUqalD03S144"

export default function AccountBillingPage() {
  const userEmail = getUserEmail()

  return (
    <div>
      <a href={`${billingInfoLink}?prefilled_email=${userEmail}`}>Edit Billing</a>
    </div>
  )
}
