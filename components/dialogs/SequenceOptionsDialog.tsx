import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { sequenceOptions } from "@/constants/sequence-options"
import { sequenceFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import SequenceOptionsItem from "./SequenceOptionsItem"

interface Props {
  open: boolean
  onOpenChange: () => void
  onSubmit: (values: z.infer<typeof sequenceFormSchema>) => void
}

export default function SequenceOptionsDialog({ open, onOpenChange, onSubmit }: Props) {
  const form = useForm<z.infer<typeof sequenceFormSchema>>({
    resolver: zodResolver(sequenceFormSchema),
    defaultValues: {
      play_code: "",
      initial_direction: "",
      counter_direction: "",
      last_dribble_type: "",
      type_of_shot: "CS3",
      screener_pick_and_roll: "",
      on_ball_defender_pick_and_roll: "",
      ball_handler_pick_and_roll: "",
    },
  })

  const pickAndRollValue = form.watch("screener_pick_and_roll")
  const disableLastTwoOptions = !pickAndRollValue || pickAndRollValue === "NPNR"

  const onSelectValue = (key: any, value: string) => {
    form.setValue(key, value)
  }

  useEffect(() => {
    if (disableLastTwoOptions) {
      form.setValue("on_ball_defender_pick_and_roll", "")
      form.setValue("ball_handler_pick_and_roll", "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disableLastTwoOptions])

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
                <SequenceOptionsItem
                  key={sequenceInput.name}
                  sequenceInput={sequenceInput}
                  control={form.control}
                  disableLastTwoOptions={disableLastTwoOptions}
                  onSelectValue={onSelectValue}
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
