"use server"

import { createClient } from "@/lib/supabase/actionts"
import { forgotPasswordFormSchema } from "@/types"
import { cookies } from "next/headers"
import { z } from "zod"

type Inputs = z.infer<typeof forgotPasswordFormSchema>

export async function forgotPassword(values: Inputs) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { email } = values

  if (typeof email !== "string") {
    return { error: "Invalid email", data: null }
  }

  return await supabase.auth.resetPasswordForEmail(email)
}
