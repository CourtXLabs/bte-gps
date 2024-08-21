import PlayerDetailsView from "@/components/sections/customer/player-details/PlayerDetailsView"
import AuthGuard from "@/guards/AuthGuard"
import { gameLimitOptions } from "@/types"
import { Metadata } from "next"

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
  return (
    <AuthGuard>
      <PlayerDetailsView id={params.id} searchParams={searchParams as Required<Props["searchParams"]>} />
    </AuthGuard>
  )
}
