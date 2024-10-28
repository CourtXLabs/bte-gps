import LogoutButton from "@/components/buttons/LogoutButton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { getUserData } from "@/lib/auth"
import AccountLinks from "./AccountLinks"

export default async function AccountSidebar() {
  const userData = await getUserData()
  const userFullName = userData?.user_metadata?.name
  const firstName = userFullName?.split(" ")[0]

  const mobileElement = (
    <Accordion type="single" collapsible className="lg:hidden">
      <AccordionItem value="account-settings" className="border-none">
        <AccordionTrigger className="p-0 hover:underline">
          <div className="text-left">
            <span className="font-light">Welcome</span>{" "}
            <span className="block break-words pb-1 text-3xl font-bold">{firstName || "Customer"}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-8">
          <div className="flex flex-col gap-8">
            <AccountLinks />
            <LogoutButton className="mt-auto" />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
  const desktopElement = (
    <div className="hidden flex-col gap-8 lg:flex">
      <div>
        <span className="font-light">Welcome</span>{" "}
        <span className="block break-words pb-1 text-3xl font-bold">{firstName || "Customer"}</span>
      </div>
      <AccountLinks />
      <LogoutButton className="mt-auto" />
    </div>
  )

  return (
    <Card className="lg:h-[45rem]">
      <CardContent className="h-full w-full pt-6 text-lg lg:w-72">
        {mobileElement}
        {desktopElement}
      </CardContent>
    </Card>
  )
}
