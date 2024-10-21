import LogoutButton from "@/components/buttons/LogoutButton"
import { Card, CardContent } from "@/components/ui/card"
import { getUserData } from "@/lib/auth"
import AccountLinks from "./AccountLinks"

export default async function AccountSidebar() {
  const userData = await getUserData()
  const userFullName = userData?.user_metadata?.name
  const firstName = userFullName?.split(" ")[0]
  return (
    <Card className="h-[45rem]">
      <CardContent className="flex h-full w-72 flex-col gap-8 pt-6 text-lg">
        <div>
          <span className="font-light">Welcome</span>{" "}
          <span className="block break-words pb-1 text-3xl font-bold">{firstName || "Customer"}</span>
        </div>
        <AccountLinks />
        <LogoutButton className="mt-auto" />
      </CardContent>
    </Card>
  )
}
