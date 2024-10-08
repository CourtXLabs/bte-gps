import { createClient } from "@/lib/supabase/server"
import { Insights } from "@/types"
import { cookies } from "next/headers"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const players = await supabase.from("player").select("id, insights").eq("id", params.id).single()

  return Response.json(players.data?.insights as Insights)
}
