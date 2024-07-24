"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"

const gameOptions = [
  { value: "all", label: "All games" },
  { value: "5", label: "Last 5 games" },
  { value: "10", label: "Last 10 games" },
  { value: "41", label: "Last 41 games" },
  { value: "82", label: "Last 82 games" },
  { value: "home", label: "Home games" },
  { value: "away", label: "Away games" },
]

export default function PlayerGamesFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("games", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="games-select">Games</Label>
      <Select onValueChange={handleValueChange} defaultValue={searchParams.get("games") || "all"}>
        <SelectTrigger id="games-select">
          <SelectValue placeholder="Select games" />
        </SelectTrigger>
        <SelectContent>
          {gameOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
