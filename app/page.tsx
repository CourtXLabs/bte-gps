import CustomerHomeView from "@/components/sections/customer/player-list/CustomerHomeView"
import AuthGuard from "@/guards/AuthGuard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "BTE Players",
  description: "BTE Players",
}

export default async function Home() {
  return (
    <AuthGuard>
      <CustomerHomeView />
    </AuthGuard>
  )
}
