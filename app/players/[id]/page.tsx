import PlayerDetailsView from "@/components/sections/customer/player-details/PlayerDetailsView"
import AuthGuard from "@/guards/AuthGuard"
import { gameLimitOptions } from "@/types"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "BTE Player Reports",
  description: "BTE Player Reports",
}

interface Props {
  params: {
    id: string
  }
  searchParams: { games?: gameLimitOptions; season?: string }
}

export default async function PlayerDetailsPage({ params, searchParams }: Props) {
  const { games, season } = searchParams

  if (!games || !season) {
    const defaultGames = "10" as gameLimitOptions
    const defaultSeason = "all"

    const newSearchParams = new URLSearchParams(searchParams as Record<string, string>)
    if (!games) newSearchParams.set("games", defaultGames)
    if (!season) newSearchParams.set("season", defaultSeason)

    redirect(`/players/${params.id}?${newSearchParams.toString()}`)
  }

  return (
    <AuthGuard>
      <PlayerDetailsView id={params.id} searchParams={searchParams as Required<Props["searchParams"]>} />
    </AuthGuard>
  )
}
