import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/login")
  }
  return (
    <div>
      <p>Hello BTE GPS!</p>
      <Button>Hello BTE GPS!</Button>
    </div>
  )
}
