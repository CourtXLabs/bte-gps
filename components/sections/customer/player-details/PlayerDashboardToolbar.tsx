"use client"

import Autocomplete from "@/components/Autocomplete"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SimlePlayerData, playerDashboardToolbarFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface Props {
  players: SimlePlayerData[]
}

export default function PlayerDashboardToolbar({ players }: Props) {
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

  const activePlayerName = players?.find((player) => player.id == Number(params.id as string))?.name
  const onSelectPlayer = (value: string) => {
    router.push(`/players/${value}`)
    setIsPlayerAutocompleteOpen(false)
  }

  const onTogglePlayerAutocomplete = () => {
    setIsPlayerAutocompleteOpen((previous) => !previous)
  }

  return (
    <Form {...form}>
      <form className="flex items-center gap-3">
        <FormField
          control={form.control}
          name="player"
          render={() => (
            <FormItem className="flex w-48 flex-col">
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
