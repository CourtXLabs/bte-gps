"use server"

import { createClient } from "@/lib/supabase/actionts"
import { loginFormSchema } from "@/types"
import { revalidatePath } from "next/cache"
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

  revalidatePath("/", "layout")
  redirect("/")
}
