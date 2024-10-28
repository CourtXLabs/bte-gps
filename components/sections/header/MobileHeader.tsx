"use client"

import Logo from "@/components/Logo"
import MenuIcon from "@/components/icons/MenuIcon"
import { Button, buttonVariants } from "@/components/ui/button"
import useBoolean from "@/hooks/useBoolean"
import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import ProfileInfo from "./ProfileInfo"

interface Props {
  isAdmin: boolean
  isLoggedIn: boolean
  userEmail?: string
  userFullName: string
}

export default function MobileHeader({ isAdmin, isLoggedIn, userEmail, userFullName }: Props) {
  const isMenuVisible = useBoolean()

  const handleMenuToggle = () => {
    if (isMenuVisible.value) {
      document.body.style.overflow = "auto"
    } else {
      document.body.style.overflow = "hidden"
      window.scrollTo(0, 0)
    }
    isMenuVisible.onToggle()
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        isMenuVisible.onFalse()
        document.body.style.overflow = "auto"
      }
    })
  }, [])

  return (
    <>
      <div className="mx-auto flex h-[3.375rem] max-w-screen-2xl items-center justify-between gap-2 lg:hidden xl:gap-9">
        <div className="relative">
          <Logo width={150} />
          <span className="absolute -right-12 bottom-0 rounded-2xl bg-primary px-2 py-1 text-sm leading-none text-black">
            Beta
          </span>
        </div>
        <Button className="h-auto rounded-full p-1.5" onClick={handleMenuToggle}>
          {isMenuVisible.value ? <XIcon /> : <MenuIcon width={24} height={24} />}
        </Button>
      </div>

      <div className={cn("fixed left-0 z-10 hidden h-full w-full bg-background", { block: isMenuVisible.value })}>
        <ul className="flex flex-col items-start gap-8 pt-12">
          <li className="list-inside list-disc">
            <Link
              href="/players"
              className={cn(buttonVariants({ variant: "link" }), "px-0 text-xl font-normal text-foreground")}
              onClick={handleMenuToggle}
            >
              Players
            </Link>
          </li>
          <li className="list-inside list-disc">
            <Link
              href="/about-us"
              className={cn(buttonVariants({ variant: "link" }), "px-0 text-xl font-normal text-foreground")}
              onClick={handleMenuToggle}
            >
              About Us
            </Link>
          </li>
          <li className="list-inside list-disc">
            <Link
              href="/glossary"
              className={cn(buttonVariants({ variant: "link" }), "px-0 text-xl font-normal text-foreground")}
              onClick={handleMenuToggle}
            >
              Glossary
            </Link>
          </li>
          {isAdmin && (
            <li className="list-inside list-disc">
              <Link
                href="/add-game"
                className={cn(buttonVariants({ variant: "link" }), "px-0 text-xl font-normal text-foreground")}
                onClick={handleMenuToggle}
              >
                Add Game
              </Link>
            </li>
          )}
        </ul>
        <div className="pl-4 pt-8">
          {isLoggedIn ? (
            <ProfileInfo email={userEmail} name={userFullName} onClick={handleMenuToggle} />
          ) : (
            <Link
              href="/auth/login"
              className={cn(buttonVariants({ variant: "link" }), "px-0 text-xl text-foreground")}
              onClick={handleMenuToggle}
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
