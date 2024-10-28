import Logo from "@/components/Logo"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import ProfileInfo from "./ProfileInfo"

interface Props {
  isAdmin: boolean
  isLoggedIn: boolean
  userEmail?: string
  userFullName: string
}

export default function DesktopHeader({ isAdmin, isLoggedIn, userEmail, userFullName }: Props) {
  return (
    <div className="mx-auto hidden max-w-screen-2xl items-center justify-between gap-2 lg:flex xl:gap-9">
      <div className="relative">
        <Logo />
        <span className="absolute -right-12 bottom-0 rounded-2xl bg-primary px-2 py-1 text-sm leading-none text-black">
          Beta
        </span>
      </div>
      <div className="flex items-center gap-2 xl:gap-9">
        <Link
          href="/players"
          className={cn(buttonVariants({ variant: "link" }), "text-xl font-normal text-foreground")}
        >
          Players
        </Link>
        <Link
          href="/about-us"
          className={cn(buttonVariants({ variant: "link" }), "text-xl font-normal text-foreground")}
        >
          About Us
        </Link>
        <Link
          href="/glossary"
          className={cn(buttonVariants({ variant: "link" }), "text-xl font-normal text-foreground")}
        >
          Glossary
        </Link>
        {isAdmin && (
          <Link
            href="/add-game"
            className={cn(buttonVariants({ variant: "link" }), "text-xl font-normal text-foreground")}
          >
            Add Game
          </Link>
        )}
      </div>
      <div>
        {isLoggedIn ? (
          <ProfileInfo email={userEmail} name={userFullName} />
        ) : (
          <Link href="/auth/login" className={cn(buttonVariants({ variant: "link" }), "text-xl text-foreground")}>
            Log In
          </Link>
        )}
      </div>
    </div>
  )
}
