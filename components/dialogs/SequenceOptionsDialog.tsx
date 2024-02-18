import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sequenceOptions } from "@/constants"
import { sequenceFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"

interface Props {
  open: boolean
  onOpenChange: () => void
  onSubmit: (values: z.infer<typeof sequenceFormSchema>) => void
}

export default function SequenceOptionsDialog({ open, onOpenChange, onSubmit }: Props) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <Form {...form}>
          <form id="sequence-form" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="border-b-2 border-accent pb-6">Sequence Details</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-b-2 border-accent pb-6">
              {sequenceOptions.map((sequenceInput) => (
                <FormField
                  key={sequenceInput.name}
                  control={form.control}
                  name={sequenceInput.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{sequenceInput.label}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={sequenceInput.label} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sequenceInput.options.map((sequence) => (
                            <SelectItem key={sequence.value} value={sequence.value}>
                              {sequence.label}
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
              <Button type="submit" form="sequence-form">
                Submit
              </Button>
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
