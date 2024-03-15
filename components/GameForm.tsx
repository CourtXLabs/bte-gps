"use client"

import { cn } from "@/lib/utils"
import useBteStore from "@/stores/bteDataStore"
import { GameTypes, gameFormSchema } from "@/types"
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
import { z } from "zod"
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

export default function GameForm() {
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
    setDatatoSave(data as any)
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
            <FormItem>
              <FormLabel>Player Name</FormLabel>
              <FormControl>
                <Input placeholder="Player Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Team Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="opponentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opponent Name</FormLabel>
              <FormControl>
                <Input placeholder="Opponent Name" {...field} />
              </FormControl>
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
