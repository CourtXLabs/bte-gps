"use client"

import { cn } from "@/lib/utils"
import useBteStore from "@/stores/bteDataStore"
import { GameSaveData, GameTypes, PlayerData, TeamData, gameFormSchema } from "@/types"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"

import { saveGame } from "@/app/actions"
import { INITIAL_GAME_TYPE } from "@/constants"
import { createClient } from "@/lib/supabase/client"
import { uploadImages } from "@/utils/upload-data"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { z } from "zod"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
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
  const { sequences, changeGameType, toggleLoading, toggleIsSaved, setDatatoSave } = useBteStore()
  const form = useForm<z.infer<typeof gameFormSchema>>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
      gameType: INITIAL_GAME_TYPE,
      playerName: "",
      teamName: "",
      opponentName: "",
    },
  })
  const gameType = form.watch("gameType") as GameTypes

  const onToggleTeamCombobox = () => setIsTeamComboboxOpen((prev) => !prev)
  const onTogglePlayerCombobox = () => setIsPlayerComboboxOpen((prev) => !prev)
  const onToggleOpponentTeamCombobox = () => setIsOpponentTeamComboboxOpen((prev) => !prev)

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
              <Button variant="outline">{gameType}</Button>
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
              <Popover open={isPlayerComboboxOpen} onOpenChange={onTogglePlayerCombobox}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("justify-between font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field?.value || "Select player"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search player..." className="h-9" />
                    <CommandEmpty>No player found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {players?.map((player) => (
                          <CommandItem
                            value={player.name}
                            key={player.id}
                            onSelect={() => {
                              form.setValue("playerName", player.name)
                              form.setValue("playerId", Number(player.id))
                              form.setValue("jersey", player.jersey?.toString() || "")
                              onTogglePlayerCombobox()
                            }}
                          >
                            {player.name} {typeof player.jersey === "number" && `#${player.jersey}`}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                player.name === field.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Team</FormLabel>
              <Popover open={isTeamComboboxOpen} onOpenChange={onToggleTeamCombobox}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("justify-between font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field?.value || "Select team"}

                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search team..." className="h-9" />
                    <CommandEmpty>No team found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {teams?.map((team) => (
                          <CommandItem
                            value={team.name}
                            key={team.id}
                            onSelect={() => {
                              form.setValue("teamName", team.name)
                              form.setValue("teamId", Number(team.id))
                              onToggleTeamCombobox()
                            }}
                          >
                            {team.name}
                            <CheckIcon
                              className={cn("ml-auto h-4 w-4", team.name === field.value ? "opacity-100" : "opacity-0")}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="opponentName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Opponent Team</FormLabel>
              <Popover open={IsOpponentTeamComboboxOpen} onOpenChange={onToggleOpponentTeamCombobox}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("justify-between font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field?.value || "Select team"}

                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search team..." className="h-9" />
                    <CommandEmpty>No team found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {teams?.map((team) => (
                          <CommandItem
                            value={team.name}
                            key={team.id}
                            onSelect={() => {
                              form.setValue("opponentName", team.name)
                              form.setValue("opponentTeamId", Number(team.id))
                              onToggleOpponentTeamCombobox()
                            }}
                          >
                            {team.name}
                            <CheckIcon
                              className={cn("ml-auto h-4 w-4", team.name === field.value ? "opacity-100" : "opacity-0")}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
                <Input placeholder="Jersey" type="number" {...field} />
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
                      className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
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
