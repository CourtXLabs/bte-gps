import { getIsLoggedIn } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function LandingPage() {
  const isLoggedIn = await getIsLoggedIn()
  if (isLoggedIn) {
    return redirect("/athletes")
  } else {
    redirect("/auth/login")
  }
}
