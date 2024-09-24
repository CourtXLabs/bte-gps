"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DEFAULT_GAMES_COUNT, DEFAULT_SEASON } from "@/global-constants"
import { useRouter, useSearchParams } from "next/navigation"

const gameOptions = [
  { value: "all", label: "All games" },
  { value: "5", label: "Last 5 games" },
  { value: "10", label: "Last 10 games" },
  { value: "home", label: "Home games" },
  { value: "away", label: "Away games" },
]

interface Props {
  seasons: { season: string }[]
}

export default function PlayerGamesFilter({ seasons }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const games = searchParams.get("games") || DEFAULT_GAMES_COUNT
  const season = searchParams.get("season") || DEFAULT_SEASON

  const seasonOptions = [
    ...seasons.map((season) => ({ value: season.season, label: season.season })),
    { value: "all", label: "All seasons" },
  ]

  const handleGamesChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("games", value)
    router.push(`?${params.toString()}`)
  }

  const handleSeasonChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("season", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex w-full flex-col gap-4 md:w-max md:flex-row">
      <div className="flex w-full min-w-48 flex-col space-y-2">
        <Label htmlFor="season-select" className="leading-none">
          Season
        </Label>
        <Select onValueChange={handleSeasonChange} defaultValue={season}>
          <SelectTrigger id="season-select">
            <SelectValue placeholder="Select season" />
          </SelectTrigger>
          <SelectContent>
            {seasonOptions?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-full min-w-48 flex-col space-y-2">
        <Label htmlFor="games-select">Games</Label>
        <Select onValueChange={handleGamesChange} defaultValue={games}>
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
    </div>
  )
}
