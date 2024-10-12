"use server"

import { createClient } from "@/lib/supabase/actionts"
import { signupFormSchema } from "@/types"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { z } from "zod"

type Inputs = z.infer<typeof signupFormSchema>

export async function signUp(values: Inputs) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const supabaseAdmin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const { email, name, confirmPassword, password } = values

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof name !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return { error: "Invalid input", data: null }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords must match", data: null }
  }

  const signUpData = {
    email,
    password,
  }

  const { data, error } = await supabase.auth.signUp(signUpData)

  if (error || !data.user) {
    return { error: "Error signing up", data: null }
  }

  supabaseAdmin.auth.admin.updateUserById(data.user.id, {
    user_metadata: {
      name,
    },
  })

  return { error: null, data }
}
