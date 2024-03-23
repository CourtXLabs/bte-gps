import PlayerDetailsView from "@/components/sections/customer/player-details/PlayerDetailsView"
import AuthGuard from "@/guards/AuthGuard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "BTE Player Reports",
  description: "BTE Player Reports",
}

interface Props {
  params: {
    id: string
  }
}

export default async function PlayerDetailsPage({ params }: Props) {
  return (
    <AuthGuard>
      <PlayerDetailsView id={params.id} />
    </AuthGuard>
  )
}
