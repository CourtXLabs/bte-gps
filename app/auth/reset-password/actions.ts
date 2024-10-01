"use server"

import { createClient } from "@/lib/supabase/actionts"
import { resetPasswordFormSchema } from "@/types"
import { cookies } from "next/headers"
import { z } from "zod"

type Inputs = z.infer<typeof resetPasswordFormSchema>

export async function resetPassword(values: Inputs) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { newPassword, confirmPassword } = values

  if (typeof newPassword !== "string" || typeof confirmPassword !== "string") {
    return { data: null, error: "Invalid input" }
  }

  if (newPassword !== confirmPassword) {
    return { data: null, error: "Passwords must match" }
  }

  return await supabase.auth.updateUser({
    password: newPassword,
  })
}
