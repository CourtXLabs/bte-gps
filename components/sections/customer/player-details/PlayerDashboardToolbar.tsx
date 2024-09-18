"use client"

import Autocomplete from "@/components/Autocomplete"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AVAILABLE_PLAYER_IDS } from "@/global-constants"
import { SimlePlayerData, playerDashboardToolbarFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface Props {
  players: SimlePlayerData[]
  isAdmin: boolean
}

export default function PlayerDashboardToolbar({ players, isAdmin }: Props) {
  const params = useParams()
  const router = useRouter()
  const [isPlayerAutocompleteOpen, setIsPlayerAutocompleteOpen] = useState(false)

  const form = useForm<z.infer<typeof playerDashboardToolbarFormSchema>>({
    resolver: zodResolver(playerDashboardToolbarFormSchema),
    defaultValues: {
      game: "",
      player: "",
    },
  })

  const playersOptions = players?.map((player) => ({
    value: player.id,
    label: player.name,
  }))

  const disabledOptions = isAdmin
    ? []
    : playersOptions.flatMap((player) => (AVAILABLE_PLAYER_IDS.has(player.value) ? [] : player.value))

  const activePlayerName = players?.find((player) => player.id == Number(params.id as string))?.name
  const onSelectPlayer = (value: string) => {
    router.push(`/players/${value}`)
    setIsPlayerAutocompleteOpen(false)
  }

  const onTogglePlayerAutocomplete = () => {
    setIsPlayerAutocompleteOpen((previous) => !previous)
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 sm:flex-row sm:items-end">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="player"
            render={() => (
              <FormItem className="flex w-full flex-col sm:w-48">
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
    </div>
  )
}
