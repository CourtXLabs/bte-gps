"use client"

import Autocomplete from "@/components/Autocomplete"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EMPTY_AUTOCOMPLETE_VALUE, EMPTY_SELECT_VALUE } from "@/constants/misc"
import { AVAILABLE_PLAYER_IDS } from "@/global-constants"
import fetcher from "@/lib/swr/fetcher"
import { LevelTypes, SimlePlayerData, SimpleTeamData, playerListToolbarFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import useSWR from "swr"
import { z } from "zod"

interface Props {
  isAdmin: boolean
}

export default function PlayersTableToolbar({ isAdmin }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTeamId = searchParams.get("team")
  const activePlayerId = searchParams.get("player")
  const activePlayerLevel = searchParams.get("player_level") as LevelTypes

  const { data: teamData } = useSWR<SimpleTeamData[]>("/api/teams", fetcher)
  const { data: playerData } = useSWR<SimlePlayerData[]>(`/api/players?team=${activeTeamId ?? ""}`, fetcher)

  const [isTeamAutocompleteOpen, setIsTeamAutocompleteOpen] = useState(false)
  const [isPlayerAutocompleteOpen, setIsPlayerAutocompleteOpen] = useState(false)

  const teamsOptions = [
    { value: EMPTY_AUTOCOMPLETE_VALUE, label: "No filter" }, // Empty first element
    ...(teamData?.map((team) => ({
      value: team.id,
      label: team.name,
    })) || []),
  ]

  const playersOptions =
    playerData?.map((player) => ({
      value: player.id,
      label: player.name,
    })) || []

  const activeTeamName = teamData?.find((team) => team.id == Number(activeTeamId))?.name
  const activePlayerName = playerData?.find((player) => player.id == Number(activePlayerId))?.name

  const disabledOptions = isAdmin
    ? []
    : playersOptions.flatMap((player) => (AVAILABLE_PLAYER_IDS.has(player.value) ? [] : player.value))

  const form = useForm<z.infer<typeof playerListToolbarFormSchema>>({
    resolver: zodResolver(playerListToolbarFormSchema),
    defaultValues: {
      player_level: activePlayerLevel ?? "",
      team: activeTeamId ?? "",
      player: activeTeamId ?? "",
    },
  })

  const onToggleTeamAutocomplete = () => {
    setIsTeamAutocompleteOpen((previous) => !previous)
  }

  const onTogglePlayerAutocomplete = () => {
    setIsPlayerAutocompleteOpen((previous) => !previous)
  }

  const onSelectLevel = (value: string | number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set("page", "1")

    if (value !== EMPTY_SELECT_VALUE) {
      newSearchParams.set("player_level", value as string)
    } else {
      newSearchParams.delete("player_level")
    }

    router.push(`?${newSearchParams.toString()}`)
  }

  const onSelectTeam = (value: string | number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set("page", "1")

    if (value !== EMPTY_AUTOCOMPLETE_VALUE) {
      newSearchParams.set("team", value as string)
    } else {
      newSearchParams.delete("team")
    }
    setIsTeamAutocompleteOpen(false)
    router.push(`?${newSearchParams.toString()}`)
  }

  const onSelectPlayer = (value: string | number) => {
    router.push(`/players/${value}`)
  }

  return (
    <Form {...form}>
      <form className="flex flex-col items-center gap-3 pb-4 sm:flex-row sm:pb-0">
        <FormField
          control={form.control}
          name="player_level"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col sm:w-40">
              <FormLabel>Level</FormLabel>
              <Select onValueChange={onSelectLevel} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={EMPTY_SELECT_VALUE}>No filter</SelectItem>
                  {Object.entries(LevelTypes).map(([key, value]) => (
                    <SelectItem value={key} key={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="team"
          render={() => (
            <FormItem className="flex w-full flex-col sm:w-40">
              <FormLabel>Team</FormLabel>
              <Autocomplete
                value={activeTeamName}
                isOpen={isTeamAutocompleteOpen}
                options={teamsOptions}
                placeholder="Select team"
                searchPlaceholder="Search team..."
                noDataMessage="No team found."
                onToggle={onToggleTeamAutocomplete}
                onSelect={onSelectTeam}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="player"
          render={() => (
            <FormItem className="flex w-full flex-col sm:w-40">
              <FormLabel>Player</FormLabel>
              <Autocomplete
                disabled={disabledOptions}
                value={activePlayerName}
                isOpen={isPlayerAutocompleteOpen}
                options={playersOptions}
                placeholder="Select player"
                searchPlaceholder="Search player..."
                noDataMessage="No player found."
                onToggle={onTogglePlayerAutocomplete}
                onSelect={onSelectPlayer}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
