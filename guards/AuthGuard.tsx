import { getIsLoggedIn } from "@/lib/auth"
import { redirect } from "next/navigation"
import React from "react"

export default async function AuthGuard({ children }: { children: React.ReactNode }) {
  const isLoggedIn = await getIsLoggedIn()
  if (!isLoggedIn) {
    redirect("/login")
  }
  return <>{children}</>
}
