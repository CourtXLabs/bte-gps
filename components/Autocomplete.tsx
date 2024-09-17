"use client"

import { cn } from "@/lib/utils"
import { CheckIcon, PlusIcon } from "@radix-ui/react-icons"
import { ChevronDown } from "lucide-react"
import { useRef } from "react"
import { Button } from "./ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { FormControl } from "./ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

const sizes = {
  default: {
    trigger: "h-11 p-4",
    icon: "h-5 w-5",
    iconContainer: "min-w-5",
  },
  sm: {
    trigger: "h-9 px-3 py-2 text-xs",
    icon: "h-4 w-4",
    iconContainer: "min-w-4",
  },
} as const

type Size = keyof typeof sizes

const variants = {
  default: {
    trigger: "bg-muted",
    item: "",
  },
  dark: {
    trigger: "bg-muted-dark text-muted-dark-foreground hover:bg-accent-dark",
    item: "text-muted-dark-foreground data-[highlighted]:bg-accent-dark",
  },
} as const

type Variant = keyof typeof variants

interface Props {
  isOpen: boolean
  onToggle: () => void
  value?: string
  onSelect: (value: string) => void
  options: { value: string | number; label: string }[]
  placeholder?: string
  searchPlaceholder?: string
  noDataMessage?: string
  onAddNew?: (value: string) => void
  className?: string
  disabled?: number[]
  size?: Size
  variant?: Variant
}

export default function Autocomplete({
  isOpen,
  onToggle,
  value,
  onSelect,
  options,
  placeholder,
  searchPlaceholder,
  noDataMessage,
  onAddNew,
  className,
  disabled,
  size = "default",
  variant = "default",
}: Props) {
  const handleSelect = (id: string) => () => onSelect(id)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleAddNew = () => {
    if (onAddNew) {
      onAddNew(searchInputRef.current?.value || "")
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={onToggle}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between border-none font-normal hover:text-foreground",
              sizes[size].trigger,
              variants[variant].trigger,
              !value && "text-muted-foreground",
              className,
            )}
          >
            <span className="overflow-hidden">{value || placeholder || "Select data"}</span>
            <ChevronDown className={cn("ml-2", sizes[size].icon)} />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder || "Search..."} className="h-9" ref={searchInputRef} />
          <CommandEmpty>
            <div>{noDataMessage || "No data found"}</div>
            {onAddNew && (
              <Button variant="link" className="mt-2" onClick={handleAddNew}>
                Add new entry <PlusIcon className="ml-1 h-4 w-4" />
              </Button>
            )}
          </CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  value={option.value as string}
                  key={option.value}
                  onSelect={handleSelect(option.value as string)}
                  disabled={disabled?.includes(Number(option.value))}
                  className={variants[variant].item}
                >
                  {option.label}
                  <CheckIcon className={cn("ml-auto h-4 w-4", option.value === value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
