import Unauthorized403Error from "@/components/sections/error/Unauthorized403Error"
import { createClient } from "@/lib/supabase/server"
import { USER_ROLES } from "@/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import React from "react"

export default async function AdminGuard({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/login")
  }

  // TODO: Add role data on the token to avoid this extra request
  const { data: roleData } = await supabase
    .schema("users")
    .from("user_roles")
    .select("*")
    .eq("user_id", data.user.id)
    .single()

  if (roleData?.role_id !== USER_ROLES.ADMIN) {
    return <Unauthorized403Error />
  }

  return <>{children}</>
}
