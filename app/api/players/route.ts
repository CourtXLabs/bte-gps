import { createClient } from "@/lib/supabase/server"
import { PlayerData } from "@/types"
import { cookies } from "next/headers"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const teamId = searchParams.get("team")

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let query = supabase.from("player").select("id, name, team_id, jersey")

  if (typeof teamId === "string" && teamId.trim() !== "") {
    query = query.eq("team_id", teamId)
  }

  const players = await query

  return Response.json(players.data as PlayerData[])
}
