"use client"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const pages = [
  {
    title: "Account Settings",
    href: "/account/settings",
  },
  {
    title: "Billing Information",
    href: "/account/billing",
  },
]

export default function AccountLinks() {
  const pathname = usePathname()

  return pages.map((page) => (
    <Link
      key={page.href}
      className={cn(
        buttonVariants({ variant: "link" }),
        "flex h-auto w-full items-center justify-between p-0 text-lg font-medium text-foreground",
        pathname === page.href && "font-bold",
      )}
      href={page.href}
    >
      {page.title}
      <ChevronRight />
    </Link>
  ))
}
