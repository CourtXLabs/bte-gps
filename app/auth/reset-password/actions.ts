"use server"

import { createClient } from "@/lib/supabase/actionts"
import { resetPasswordFormSchema } from "@/types"
import { cookies } from "next/headers"
import { z } from "zod"

type Inputs = z.infer<typeof resetPasswordFormSchema> & { code: string }

export async function resetPassword(values: Inputs) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { newPassword, confirmPassword, code } = values

  if (typeof newPassword !== "string" || typeof confirmPassword !== "string" || typeof code !== "string") {
    return { data: null, error: "Invalid input" }
  }

  if (newPassword !== confirmPassword) {
    return { data: null, error: "Passwords must match" }
  }

  const { error: authError } = await supabase.auth.exchangeCodeForSession(code)
  if (authError) {
    return { data: null, error: authError.message }
  }
  const { error: updatePasswordError } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (updatePasswordError) {
    return { data: null, error: updatePasswordError.message }
  }

  return { data: null, error: null }
}
