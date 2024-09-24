import { buttonVariants } from "@/components/ui/button"
import { getIsAdmin } from "@/lib/auth"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import ProfileInfo from "./ProfileInfo"

export default async function Header() {
  const isAdmin = await getIsAdmin()
  return (
    <div className="w-full bg-black p-4">
      <div className="mx-auto flex max-w-screen-2xl items-center gap-6 lg:gap-12">
        <div className="relative">
          <Link href="/">
            <Image src="/logo.jpeg" alt="logo" width={200} height={60} />
          </Link>
          <span className="absolute -right-12 bottom-0 rounded-2xl bg-primary px-2 py-1 text-sm leading-none text-black">
            Beta
          </span>
        </div>
        <Link href="/about-us" className={cn(buttonVariants({ variant: "link" }), "ml-auto text-xl text-foreground")}>
          About Us
        </Link>
        <Link href="/glossary" className={cn(buttonVariants({ variant: "link" }), "text-xl text-foreground")}>
          Glossary
        </Link>
        {isAdmin && (
          <Link href="/add-game" className={cn(buttonVariants({ variant: "link" }), "mr-auto text-xl text-foreground")}>
            Add Game
          </Link>
        )}
        <ProfileInfo />
      </div>
    </div>
  )
}
