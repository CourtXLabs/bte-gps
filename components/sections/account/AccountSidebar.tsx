import LogoutButton from "@/components/buttons/LogoutButton"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getUserData } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

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
        <Link
          className={cn(
            buttonVariants({ variant: "link" }),
            "flex w-full items-center justify-between p-0 text-lg font-bold text-foreground",
          )}
          href="/account/settings"
        >
          Account Settings
          <ChevronRight />
        </Link>
        <Link
          className={cn(
            buttonVariants({ variant: "link" }),
            "flex w-full items-center justify-between p-0 text-lg font-medium text-foreground",
          )}
          href="/account/billing"
        >
          Billing Information
          <ChevronRight />
        </Link>
        <LogoutButton className="mt-auto" />
      </CardContent>
    </Card>
  )
}
