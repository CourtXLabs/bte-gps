"use client"

import { cn } from "@/lib/utils"
import useBteStore from "@/stores/bteDataStore"
import { GameSaveData, GameTypes, PlayerData, TeamData, gameFormSchema } from "@/types"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"

import { saveGame } from "@/app/(main)/add-game/actions"
import { INITIAL_GAME_TYPE } from "@/constants/misc"
import { createClient } from "@/lib/supabase/client"
import { uploadImages } from "@/utils/upload-image-data"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { z } from "zod"
import Autocomplete from "./Autocomplete"
import { CalendarWithoutTimezone } from "./ui/calendar-without-timezone"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useToast } from "./ui/use-toast"

interface Props {
  players?: PlayerData[]
  teams?: TeamData[]
}

export default function GameForm({ players, teams }: Props) {
  const [isPlayerComboboxOpen, setIsPlayerComboboxOpen] = useState(false)
  const [isTeamComboboxOpen, setIsTeamComboboxOpen] = useState(false)
  const [IsOpponentTeamComboboxOpen, setIsOpponentTeamComboboxOpen] = useState(false)

  const supabase = createClient()
  const { toast } = useToast()
  const { getSequences, changeGameType, toggleLoading, toggleIsSaved, setDatatoSave } = useBteStore()
  const sequences = getSequences()
  const form = useForm<z.infer<typeof gameFormSchema>>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
      gameType: INITIAL_GAME_TYPE,
      playerName: "",
      homeTeam: "",
      awayTeam: "",
    },
  })
  const gameType = form.watch("gameType") as GameTypes

  const playerOptions =
    players?.map((player) => ({
      value: player.id!,
      label: `${player.name} ${typeof player.jersey === "number" && `#${player.jersey}`}`,
    })) || []

  const teamsOptions =
    teams?.map((team) => ({
      value: team.id!,
      label: team.name,
    })) || []

  const onToggleTeamCombobox = () => setIsTeamComboboxOpen((prev) => !prev)
  const onTogglePlayerCombobox = () => setIsPlayerComboboxOpen((prev) => !prev)
  const onToggleOpponentTeamCombobox = () => setIsOpponentTeamComboboxOpen((prev) => !prev)

  const onSelectPlayer = (playerId: string) => {
    const player = players?.find((player) => player.id === playerId)
    if (!player) return
    form.setValue("playerName", player.name)
    form.setValue("playerId", Number(player.id))
    form.setValue("jersey", player.jersey?.toString() || "")
    onTogglePlayerCombobox()
  }

  const onSelectTeam = (teamId: string) => {
    const team = teams?.find((team) => team.id === teamId)
    if (!team) return
    form.setValue("homeTeam", team.name)
    form.setValue("homeTeamId", Number(team.id))
    onToggleTeamCombobox()
  }

  const onSelectOpponentTeam = (teamId: string) => {
    const team = teams?.find((team) => team.id === teamId)
    if (!team) return
    form.setValue("awayTeam", team.name)
    form.setValue("awayTeamId", Number(team.id))
    onToggleOpponentTeamCombobox()
  }

  const onAddPlayer = (value: string) => {
    form.setValue("playerName", value)
    form.setValue("jersey", "")
    form.setValue("playerId", undefined)
    onTogglePlayerCombobox()
  }

  const onAddNewTeam = (value: string) => {
    form.setValue("homeTeam", value)
    form.setValue("homeTeamId", undefined)
    onToggleTeamCombobox()
  }

  const onAddNewOpponentTeam = (value: string) => {
    form.setValue("awayTeam", value)
    form.setValue("awayTeamId", undefined)
    onToggleOpponentTeamCombobox()
  }

  const onChangeGameType = (value: string) => {
    form.setValue("gameType", value as GameTypes)
    changeGameType(value as GameTypes)
  }

  const onSubmit = async (values: z.infer<typeof gameFormSchema>) => {
    toggleLoading()
    const imageNames = await uploadImages({ supabase, values, sequences })
    const data = await saveGame({ values, sequences, imageNames })

    if (data.error) {
      toast({ variant: "destructive", title: "An error occured" })
      toggleLoading()
      return
    }

    toast({ title: "Game data saved successfully!" })
    toggleIsSaved()
    setDatatoSave(data as GameSaveData)
    toggleLoading()
  }

  return (
    <Form {...form}>
      <form id="game-form" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="text-xl font-bold underline">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hover:bg-accent-dark">
                {gameType}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Game Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={gameType} onValueChange={onChangeGameType}>
                <DropdownMenuRadioItem value={GameTypes.COLLEGE}>{GameTypes.COLLEGE}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={GameTypes.HIGH_SCHOOL}>{GameTypes.HIGH_SCHOOL}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={GameTypes.PROFESSIONAL}>{GameTypes.PROFESSIONAL}</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <FormField
          control={form.control}
          name="playerName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Player</FormLabel>
              <Autocomplete
                variant="dark"
                isOpen={isPlayerComboboxOpen}
                options={playerOptions}
                value={field.value}
                placeholder="Select player"
                searchPlaceholder="Search player..."
                noDataMessage="No player found."
                onToggle={onTogglePlayerCombobox}
                onSelect={onSelectPlayer}
                onAddNew={onAddPlayer}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="homeTeam"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Home Team</FormLabel>
              <Autocomplete
                variant="dark"
                isOpen={isTeamComboboxOpen}
                options={teamsOptions}
                value={field.value}
                placeholder="Select home team"
                onToggle={onToggleTeamCombobox}
                onSelect={onSelectTeam}
                searchPlaceholder="Search team..."
                noDataMessage="No team found."
                onAddNew={onAddNewTeam}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="awayTeam"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Away Team</FormLabel>
              <Autocomplete
                variant="dark"
                isOpen={IsOpponentTeamComboboxOpen}
                options={teamsOptions}
                value={field.value}
                placeholder="Select away team"
                searchPlaceholder="Search team..."
                noDataMessage="No team found."
                onToggle={onToggleOpponentTeamCombobox}
                onSelect={onSelectOpponentTeam}
                onAddNew={onAddNewOpponentTeam}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jersey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jersey</FormLabel>
              <FormControl>
                <Input variant="dark" placeholder="Jersey" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Points</FormLabel>
              <FormControl>
                <Input variant="dark" placeholder="Points" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "h-11 justify-between border-none py-4 text-left font-normal hover:bg-accent-dark hover:text-foreground",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarWithoutTimezone
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
