import Unauthorized403Error from "@/components/sections/error/Unauthorized403Error"
import { getIsAdmin } from "@/lib/auth"
import React from "react"

export default async function AdminGuard({ children }: { children: React.ReactNode }) {
  const isAdmin = await getIsAdmin()

  if (!isAdmin) {
    return <Unauthorized403Error />
  }

  return <>{children}</>
}
