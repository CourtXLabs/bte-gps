import { getIsAdmin } from "@/lib/auth"
import { Loader2Icon } from "lucide-react"
import PlayersTableToolbar from "./PlayersTableToolbar"

export default async function PlayersListLoader() {
  const isAdmin = await getIsAdmin()
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-20">
      <div className="mt-6 space-y-4 lg:min-w-[600px]">
        <PlayersTableToolbar isAdmin={isAdmin} />
        <div className="flex h-40 w-full items-center justify-center rounded-md border">
          <Loader2Icon className="h-20 w-20 animate-spin" />
        </div>
      </div>
    </div>
  )
}
