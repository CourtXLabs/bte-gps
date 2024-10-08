import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "lucide-react"
import { Button, ButtonProps } from "../ui/button"

interface Props extends ButtonProps {
  children: React.ReactNode
}

export default function AuthButton({ children, disabled, type, className, ...rest }: Props) {
  return (
    <Button
      disabled={disabled}
      className={cn("h-14 w-full justify-between rounded-full pl-5 pr-2 font-bold", className)}
    >
      {children}
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
        <ArrowRightIcon className="h-5 w-5" />
      </span>
    </Button>
  )
}
