import { buttonVariants } from "@/components/ui/button"
import { getIsAdmin } from "@/lib/auth"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import ProfileInfo from "./ProfileInfo"

export default async function Header() {
  const isAdmin = await getIsAdmin()
  return (
    <div className="w-full bg-black p-4 lg:px-0">
      <div className="mx-auto flex max-w-screen-2xl items-center gap-6 lg:gap-12">
        <Link href="/">
          <Image src="/logo.jpeg" alt="logo" width={200} height={60} />
        </Link>
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
        <p className="ml-auto text-lg font-medium text-gray-300">BETA</p>
        <ProfileInfo />
      </div>
    </div>
  )
}
