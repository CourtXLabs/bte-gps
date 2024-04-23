import CustomerHomeView from "@/components/sections/customer/player-list/CustomerHomeView"
import AuthGuard from "@/guards/AuthGuard"
import { Metadata } from "next"

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
  return (
    <AuthGuard>
      <CustomerHomeView {...searchParams} />
    </AuthGuard>
  )
}
