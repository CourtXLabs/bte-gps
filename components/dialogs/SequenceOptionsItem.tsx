import { cn } from "@/lib/utils"
import { SequenceInput } from "@/types"
import { useState } from "react"
import { Control } from "react-hook-form"
import Autocomplete from "../Autocomplete"
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

interface Props {
  sequenceInput: SequenceInput
  disableLastTwoOptions: boolean
  control: Control<any>
  onSelectValue: (key: any, value: string) => void
}

export default function SequenceOptionsItem({ sequenceInput, control, disableLastTwoOptions, onSelectValue }: Props) {
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false)

  const onSelect = (key: string) => (value: string) => {
    onSelectValue(key, value)
    setIsAutocompleteOpen(false)
  }

  const onToggleAutoComplete = () => {
    setIsAutocompleteOpen((prev) => !prev)
  }

  return (
    <FormField
      control={control}
      name={sequenceInput.name}
      render={({ field }) => {
        const isDisabled =
          sequenceInput.name === "defender_pick_and_roll" || sequenceInput.name === "ball_handler_pick_and_roll"
            ? disableLastTwoOptions
            : false

        const activeLabel = sequenceInput.options.find((option) => option.value === field.value)?.label

        return (
          <FormItem className={cn({ "opacity-50": isDisabled, "pointer-events-none": isDisabled })}>
            <FormLabel>{sequenceInput.label}</FormLabel>
            <Autocomplete
              className="w-full"
              isOpen={isAutocompleteOpen}
              options={sequenceInput.options}
              value={activeLabel}
              placeholder={sequenceInput.label}
              searchPlaceholder="Search..."
              noDataMessage="No item found."
              onToggle={onToggleAutoComplete}
              onSelect={onSelect(field.name)}
            />
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
