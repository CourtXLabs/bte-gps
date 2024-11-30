import { cn } from "@/lib/utils"
import * as React from "react"

const sizes = {
  default: {
    textarea: "min-h-[80px] p-4 text-base",
  },
  sm: {
    textarea: "min-h-[60px] px-2 py-1 text-sm",
  },
} as const

type Size = keyof typeof sizes

const variants = {
  default: {
    textarea: "bg-muted",
  },
  dark: {
    textarea: "bg-muted-dark text-muted-dark-foreground",
  },
} as const

type Variant = keyof typeof variants

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: Size
  variant?: Variant
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size = "default", variant = "default", ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full resize-none rounded-md border border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          sizes[size].textarea,
          variants[variant].textarea,
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea }
