import { createClient } from "@/lib/supabase/server"
import { TeamData } from "@/types"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const teams = await supabase.from("team").select("id, name")

  return Response.json(teams.data as TeamData[])
}
