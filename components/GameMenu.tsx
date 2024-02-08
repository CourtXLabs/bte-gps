import { useFormContext } from "react-hook-form"
import SequencesListSection from "./sections/SequencesListSection"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

export default function GameMenu() {
  const form = useFormContext()

  return (
    <div className="space-y-4 bg-background-dark p-6 xl:w-72">
      <p className="text-xl font-bold underline">College Game</p>
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
      <SequencesListSection />
    </div>
  )
}
