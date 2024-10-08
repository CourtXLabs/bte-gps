import { getIsLoggedIn } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function LandingPage() {
  const isLoggedIn = await getIsLoggedIn()
  if (isLoggedIn) {
    return redirect("/players/41")
  } else {
    redirect("/login")
  }
}
