"use server"

import { createClient } from "@/lib/supabase/actionts"
import { changeEmailAddressFormSchema, personalInfoFormSchema, updatePasswordFormSchema } from "@/types"
import { cookies } from "next/headers"
import { z } from "zod"

type UpdatePasswordInput = z.infer<typeof updatePasswordFormSchema> & { email: string }
export async function updatePassword(values: UpdatePasswordInput) {
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

export async function upadtePersonalInfo(values: z.infer<typeof personalInfoFormSchema>) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { name } = values

  if (typeof name !== "string") {
    return { data: null, error: "Invalid input" }
  }

  const { error } = await supabase.auth.updateUser({
    data: { name },
  })

  if (error) {
    return { data: null, error: error.message }
  }

  return { data: null, error: null }
}

export async function changeEmailAddress(values: z.infer<typeof changeEmailAddressFormSchema>) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { email } = values

  if (typeof email !== "string") {
    return { data: null, error: "Invalid input" }
  }

  const { error } = await supabase.auth.updateUser({
    email,
  })

  if (error) {
    return { data: null, error: error.message }
  }

  return { data: null, error: null }
}
