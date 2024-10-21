"use server"

import { createClient } from "@/lib/supabase/actionts"
import { updatePasswordFormSchema } from "@/types"
import { cookies } from "next/headers"
import { z } from "zod"

type Input = z.infer<typeof updatePasswordFormSchema> & { email: string }

export async function updatePassword(values: Input) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { email, newPassword, confirmPassword, currentPassword } = values

  if (
    typeof newPassword !== "string" ||
    typeof confirmPassword !== "string" ||
    typeof currentPassword !== "string" ||
    typeof email !== "string"
  ) {
    return { data: null, error: "Invalid input" }
  }

  if (newPassword !== confirmPassword) {
    return { data: null, error: "Passwords must match" }
  }

  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  })
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
