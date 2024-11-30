"use server"

import { userTypes } from "@/constants/contact-us"
import { getUserId } from "@/lib/auth"
import { createClient } from "@/lib/supabase/actionts"
import {
  changeEmailAddressFormSchema,
  contactUsFormSchema,
  personalInfoFormSchema,
  updatePasswordFormSchema,
} from "@/types"
import { createClient as createAdminClient } from "@supabase/supabase-js"
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

export async function deleteAccount() {
  const currentUserId = await getUserId()
  if (!currentUserId) {
    return { data: null, error: "User not found" }
  }
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const supabaseAdmin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const { error } = await supabaseAdmin.auth.admin.deleteUser(currentUserId)
  await supabase.auth.signOut()

  if (error) {
    return { data: null, error: error.message }
  }

  return { data: null, error: null }
}

export async function submitContactUsForm(values: z.infer<typeof contactUsFormSchema>) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const userId = await getUserId()

  const { email, type, message, name } = values

  if (
    typeof email !== "string" ||
    typeof message !== "string" ||
    typeof name !== "string" ||
    !userTypes.includes(type)
  ) {
    return { data: null, error: "Invalid input" }
  }

  const { error } = await supabase.from("contact_us").insert({ ...values, user_id: userId })

  if (error) {
    return { data: null, error: error.message }
  }

  return { data: null, error: null }
}
