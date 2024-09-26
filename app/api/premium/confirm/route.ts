import { createClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const session_id = requestUrl.searchParams.get("session_id")

  if (!session_id) {
    return NextResponse.json({ error: "No session ID provided" }, { status: 400 })
  }

  // Initialize Supabase client
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const supabaseAdmin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  try {
    // 1. Verify the payment with Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id)

    console.log({ session })

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 })
    }

    // 2. Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error("Error fetching user:", userError)
      return NextResponse.json({ error: "Error fetching user data" }, { status: 400 })
    }

    // 3. Update user metadata
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      app_metadata: { isPremium: true },
    })

    if (updateError) {
      console.error("Error updating user:", updateError)
      return NextResponse.json({ error: "Error updating user status" }, { status: 500 })
    }

    // 4. Create a new session with updated data
    const {
      data: { session: newSession },
      error: sessionError,
    } = await supabase.auth.refreshSession()

    if (sessionError) {
      console.error("Error creating new session:", sessionError)
      return NextResponse.json({ error: "Error refreshing session" }, { status: 500 })
    }

    // 5. Set the new session in a cookie
    const response = NextResponse.redirect(`${requestUrl.origin}/premium/thank-you`)

    if (newSession) {
      response.cookies.set("sb-omuwkdqgfpnotuycwdku-auth-token", JSON.stringify(newSession), {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    }

    return response
  } catch (error) {
    console.error("Error processing payment:", error)
    return NextResponse.json({ error: "An error occurred while processing your payment" }, { status: 500 })
  }
}
