import GameView from "@/components/GameView"
import AdminGuard from "@/guards/AdminGuard"

export default async function Home() {
  return (
    <AdminGuard>
      <GameView />
    </AdminGuard>
  )
}
