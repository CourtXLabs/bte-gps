"use server"

import { createClient } from "@/lib/supabase/actionts"
import { USER_ROLES, loginFormSchema } from "@/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

type Inputs = z.infer<typeof loginFormSchema>

export async function login(values: Inputs) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { email, password } = values

  if (typeof email !== "string" || typeof password !== "string") {
    redirect("/error")
  }

  const data = {
    email,
    password,
  }

  const { data: userData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect("/error")
  }

  // TODO: Add role data on the token to avoid this extra request
  const { data: roleData } = await supabase
    .schema("users")
    .from("user_roles")
    .select("*")
    .eq("user_id", userData.user.id)
    .single()

  if (roleData?.role_id === USER_ROLES.ADMIN) {
    redirect("/add-game")
  }

  redirect("/")
}
