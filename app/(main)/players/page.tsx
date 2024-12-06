import CustomerHomeView from "@/components/sections/customer/player-list/CustomerHomeView"
import PlayeresListLoader from "@/components/sections/customer/player-list/PlayersListLoader"
import AuthGuard from "@/guards/AuthGuard"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "BTE Players",
  description: "BTE Players",
}

interface Props {
  searchParams: {
    page?: string
    pageSize?: string
    team?: string
    player?: string
    player_level?: string
  }
}

export default async function Home({ searchParams }: Props) {
  const params = new URLSearchParams(searchParams as Record<string, string>)

  if (!params.has("player_level")) {
    params.set("player_level", "HIGH_SCHOOL")
    redirect(`?${params.toString()}`)
  }

  return (
    <AuthGuard>
      <Suspense fallback={<PlayeresListLoader />}>
        <CustomerHomeView {...searchParams} />
      </Suspense>
    </AuthGuard>
  )
}
