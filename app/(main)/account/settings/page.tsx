import DeleteAccountButton from "@/components/buttons/DeleteAccountButton"
import AccountEmailForm from "@/components/forms/AccountEmailForm"
import AccountPersonalInfoForm from "@/components/forms/AccountPersonalInfoForm"
import AccountUpdatePasswordForm from "@/components/forms/AccountUpdatePasswordForm"
import { getUserData } from "@/lib/auth"

export default async function AccountSettingsPage() {
  const userData = await getUserData()
  const email = userData?.email
  const fullName = userData?.user_metadata?.name

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Account settings</h1>
      <AccountPersonalInfoForm name={fullName} />
      <AccountEmailForm email={email} />
      <AccountUpdatePasswordForm email={email!} />
      <DeleteAccountButton />
    </div>
  )
}
