import { buttonVariants } from "@/components/ui/button"
import { getIsAdmin, getIsLoggedIn } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import ProfileInfo from "./ProfileInfo"

const getUserData = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data } = await supabase.auth.getSession()
  return data?.session?.user
}

export default async function Header() {
  const isAdmin = await getIsAdmin()
  const isLoggedIn = await getIsLoggedIn()
  const userData = await getUserData()

  const userEmail = userData?.email
  const userFullName = userData?.user_metadata?.full_name

  return (
    <div className="w-full bg-black p-4">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-6 lg:gap-9">
        <div className="relative">
          <Link href="/">
            <Image src="/logo.jpeg" alt="logo" width={200} height={60} />
          </Link>
          <span className="absolute -right-12 bottom-0 rounded-2xl bg-primary px-2 py-1 text-sm leading-none text-black">
            Beta
          </span>
        </div>
        <div className="flex items-center gap-6 lg:gap-9">
          <Link href="/about-us" className={cn(buttonVariants({ variant: "link" }), "text-xl text-foreground")}>
            About Us
          </Link>
          <Link href="/glossary" className={cn(buttonVariants({ variant: "link" }), "text-xl text-foreground")}>
            Glossary
          </Link>
          {isAdmin && (
            <Link href="/add-game" className={cn(buttonVariants({ variant: "link" }), "text-xl text-foreground")}>
              Add Game
            </Link>
          )}
        </div>
        <div>{isLoggedIn && <ProfileInfo email={userEmail} name={userFullName} />}</div>
      </div>
    </div>
  )
}
