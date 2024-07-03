"use server"

import { getIsAdmin } from "@/lib/auth"
import { createClient } from "@/lib/supabase/actionts"
import { loginFormSchema } from "@/types"
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

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect("/error")
  }

  const isAdmin = await getIsAdmin()

  if (isAdmin) {
    redirect("/add-game")
  }

  redirect("/players/41")
}
