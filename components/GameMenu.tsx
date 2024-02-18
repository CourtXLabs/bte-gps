import { cn } from "@/lib/utils"
import useBteStore from "@/stores/bteDataStore"
import { GameTypes } from "@/types"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"
import SequencesListSection from "./sections/SequencesListSection"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

export default function GameMenu() {
  const { changeGameType } = useBteStore()
  const form = useFormContext()
  const gameType = form.watch("gameType") as GameTypes

  const onChangeGameType = (value: string) => {
    form.setValue("gameType", value)
    changeGameType(value as GameTypes)
  }

  return (
    <div className="space-y-4 overflow-y-auto bg-background-dark p-6 lg:max-h-[780px] xl:w-72">
      <p className="text-xl font-bold underline">
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
      </p>
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
              <Input placeholder="Jersey" {...field} />
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
      <SequencesListSection />
    </div>
  )
}
