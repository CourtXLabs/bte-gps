import CustomerHomeView from "@/components/sections/customer/player-list/CustomerHomeView"
import PlayeresListLoader from "@/components/sections/customer/player-list/PlayersListLoader"
import AuthGuard from "@/guards/AuthGuard"
import { Metadata } from "next"
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
  }
}

export default async function Home({ searchParams }: Props) {
  const suspenseKey = new URLSearchParams(searchParams).toString()
  return (
    <AuthGuard>
      <Suspense fallback={<PlayeresListLoader />}>
        <CustomerHomeView {...searchParams} />
      </Suspense>
    </AuthGuard>
  )
}
