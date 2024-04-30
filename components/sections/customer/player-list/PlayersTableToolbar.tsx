"use client"

import Autocomplete from "@/components/Autocomplete"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { EMPTY_AUTOCOMPLETE_VALUE } from "@/constants"
import fetcher from "@/lib/swr/fetcher"
import { SimlePlayerData, SimpleTeamData, dashboardToolbarFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import useSWR from "swr"
import { z } from "zod"

export default function PlayersTableToolbar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTeamId = searchParams.get("team")
  const activePlayerId = searchParams.get("player")

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

  const playersOptions = [
    { value: EMPTY_AUTOCOMPLETE_VALUE, label: "No filter" }, // Empty first element
    ...(playerData?.map((player) => ({
      value: player.id,
      label: player.name,
    })) || []),
  ]

  const activeTeamName = teamData?.find((team) => team.id == Number(activeTeamId))?.name
  const activePlayerName = playerData?.find((player) => player.id == Number(activePlayerId))?.name

  const form = useForm<z.infer<typeof dashboardToolbarFormSchema>>({
    resolver: zodResolver(dashboardToolbarFormSchema),
    defaultValues: {
      team: "",
      player: "",
    },
  })

  const onToggleTeamAutocomplete = () => {
    setIsTeamAutocompleteOpen((previous) => !previous)
  }

  const onTogglePlayerAutocomplete = () => {
    setIsPlayerAutocompleteOpen((previous) => !previous)
  }

  const onSelectTeam = (value: string | number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (value !== EMPTY_AUTOCOMPLETE_VALUE) {
      newSearchParams.set("team", value as string)
    } else {
      newSearchParams.delete("team")
    }
    setIsTeamAutocompleteOpen(false)
    router.push(`?${newSearchParams.toString()}`)
  }

  const onSelectPlayer = (value: string | number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (value !== EMPTY_AUTOCOMPLETE_VALUE) {
      newSearchParams.set("player", value as string)
    } else {
      newSearchParams.delete("player")
    }
    setIsPlayerAutocompleteOpen(false)
    router.push(`?${newSearchParams.toString()}`)
  }

  return (
    <Form {...form}>
      <form className="flex items-center gap-3">
        <FormField
          control={form.control}
          name="team"
          render={() => (
            <FormItem className="flex w-40 flex-col">
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
            <FormItem className="flex w-40 flex-col">
              <FormLabel>Player</FormLabel>
              <Autocomplete
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
