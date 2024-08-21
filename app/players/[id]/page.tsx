import PlayerDetailsView from "@/components/sections/customer/player-details/PlayerDetailsView"
import AuthGuard from "@/guards/AuthGuard"
import { gameLimitOptions } from "@/types"
import { Metadata } from "next"
import { Suspense } from "react"

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

export const dynamic = "force-dynamic"

export default async function PlayerDetailsPage({ params, searchParams }: Props) {
  const suspenseKey = new URLSearchParams(searchParams).toString()
  return (
    <AuthGuard>
      <Suspense fallback={<div>Loading...</div>} key={suspenseKey}>
        <PlayerDetailsView id={params.id} searchParams={searchParams as Required<Props["searchParams"]>} />
      </Suspense>
    </AuthGuard>
  )
}
