import AccountUpdatePasswordForm from "@/components/forms/AccountUpdatePasswordForm"
import { getUserEmail } from "@/lib/auth"

export default async function AccountSettingsPage() {
  const email = await getUserEmail()
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Account settings</h1>
      <AccountUpdatePasswordForm email={email!} />
    </div>
  )
}
