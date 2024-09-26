import { SupabaseClient, createClient as createAdminClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

function isFullCustomer(customer: Stripe.Customer | Stripe.DeletedCustomer): customer is Stripe.Customer {
  return (customer as Stripe.Customer).email !== undefined
}

async function updateUserAsPremium(data: Stripe.Checkout.Session, supabaseAdmin: SupabaseClient) {
  // Update user status
  const session = await stripe.checkout.sessions.retrieve(data.id, {
    expand: ["line_items"],
  })
  const customerId = session.customer! as string
  const customer = await stripe.customers.retrieve(customerId)
  const priceId = session?.line_items?.data[0]?.price?.id

  if (!isFullCustomer(customer)) {
    throw new Error("Customer is deleted or invalid")
  }

  if (!customer.email) {
    throw new Error("No email found for customer")
  }

  let userId: string

  if (typeof customer.email !== "string") {
    throw new Error("No email found for customer")
  }

  if (customer.email) {
    const { data: userIdData } = await supabaseAdmin.rpc("get_user_id_by_email", {
      email: customer.email,
    })
    userId = userIdData[0].id

    if (!userIdData) {
      const { data: newUserData } = await supabaseAdmin.auth.admin.createUser({
        email: customer.email,
      })
      userId = newUserData?.user?.id || ""
    }

    await supabaseAdmin.auth.admin.updateUserById(userId, {
      app_metadata: { stripeCustomerId: customerId, stripePriceId: priceId, isPremium: true },
    })

    // TODO: Send confirmation email
  } else {
    throw new Error("No user found")
  }
}

async function revokePremiumStatus(data: Stripe.Subscription, supabaseAdmin: SupabaseClient) {
  const customerId = data.customer as string
  const customer = await stripe.customers.retrieve(customerId)

  if (!isFullCustomer(customer)) {
    throw new Error("Customer is deleted or invalid")
  }

  if (!customer.email) {
    throw new Error("No email found for customer")
  }

  const { data: userIdData, error } = await supabaseAdmin.rpc("get_user_id_by_email", {
    email: customer.email,
  })

  if (error || !userIdData || userIdData.length === 0) {
    throw new Error("No user found for the given email")
  }

  const userId = userIdData[0].id

  await supabaseAdmin.auth.admin.updateUserById(userId, {
    app_metadata: { isPremium: false },
  })
}

export async function POST(request: NextRequest) {
  const body = await request.text() // Change this to text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error(`Webhook signature verification failed. ${error instanceof Error ? error.message : "Unknown error"}`)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabaseAdmin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await updateUserAsPremium(event.data.object as Stripe.Checkout.Session, supabaseAdmin)
        break
      case "customer.subscription.deleted":
        await revokePremiumStatus(event.data.object as Stripe.Subscription, supabaseAdmin)
        break
    }
  } catch (error: any) {
    console.error(`Error processing ${event.type}: ${error.message}`)
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
