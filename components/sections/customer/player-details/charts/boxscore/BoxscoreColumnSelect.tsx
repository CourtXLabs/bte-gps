import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Props {
  options: { label: string; value: string }[]
  onValueChange: (value: string) => void
  value: string
  title: string
  placeholder: string
  className?: string
  disabled?: boolean
}

export default function BoxscoreColumnSelect({
  options,
  onValueChange,
  value,
  title,
  placeholder,
  disabled,
  className,
}: Props) {
  return (
    <div className={cn("flex h-full flex-col justify-between gap-3 py-4", className)}>
      <span className="text-center text-white">{title}</span>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger size="sm" variant="dark">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent side="top">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
