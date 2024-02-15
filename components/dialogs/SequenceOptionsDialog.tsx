import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sequenceFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"

const options = [
  { name: "playCode", label: "Play Code", options: [{ value: "test", label: "test" }] },
  { name: "initialDirection", label: "Initial Direction", options: [{ value: "test", label: "test" }] },
  { name: "counterDirection", label: "Counter Direction", options: [{ value: "test", label: "test" }] },
  { name: "lastDribbleType", label: "Last Dribble Type", options: [{ value: "test", label: "test" }] },
  { name: "typeOfShot", label: "Type of Shot", options: [{ value: "test", label: "test" }] },
  { name: "pickAndRoll", label: "Pick & Roll", options: [{ value: "test", label: "test" }] },
  // Optional:
  { name: "defenderPickAndRoll", label: "Defender Pick & Roll", options: [{ value: "test", label: "test" }] },
  { name: "ballHandlerPickAndRoll", label: "Ball Handler Pick & Roll", options: [{ value: "test", label: "test" }] },
] as Option[]

interface Props {
  open: boolean
  onOpenChange: () => void
}

interface Option {
  name:
    | "playCode"
    | "initialDirection"
    | "counterDirection"
    | "lastDribbleType"
    | "typeOfShot"
    | "pickAndRoll"
    | "defenderPickAndRoll"
    | "ballHandlerPickAndRoll"
  label: string
  options: { value: string; label: string }[]
}

export default function SequenceOptionsDialog({ open, onOpenChange }: Props) {
  const form = useForm<z.infer<typeof sequenceFormSchema>>({
    resolver: zodResolver(sequenceFormSchema),
    defaultValues: {
      playCode: "",
      initialDirection: "",
      counterDirection: "",
      lastDribbleType: "",
      typeOfShot: "",
      pickAndRoll: "",
    },
  })

  const onSubmit = (values: z.infer<typeof sequenceFormSchema>) => {
    console.log({ values })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="border-b-2 border-accent pb-6">Sequence Details</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-b-2 border-accent pb-6">
              {options.map((option) => (
                <FormField
                  key={option.name}
                  control={form.control}
                  name={option.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{option.label}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={option.label} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {option.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <DialogFooter className="pt-2 sm:justify-start">
              <Button type="submit">Submit</Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
