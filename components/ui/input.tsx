import { cn } from "@/lib/utils"
import * as React from "react"

const sizes = {
  lg: {
    input: "h-14 p-4 text-base",
  },
  default: {
    input: "h-11 p-4 text-sm",
  },
  sm: {
    input: "h-9 px-3 py-2 text-xs",
  },
} as const

type Size = keyof typeof sizes

const variants = {
  default: {
    input: "bg-muted",
  },
  dark: {
    input: "bg-muted-dark text-muted-dark-foreground",
  },
} as const

type Variant = keyof typeof variants

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: Size
  variant?: Variant
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "default", variant = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border border-input text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          sizes[size].input,
          variants[variant].input,
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
