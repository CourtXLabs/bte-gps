"use client"

import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { ExitIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"

interface Props {
  className?: string
}

export default function LogoutButton({ className }: Props) {
  const supabase = createClient()
  const { toast } = useToast()

  const onLogOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast({ variant: "destructive", title: error.message })
    } else {
      window.location.href = "/"
    }
  }

  return (
    <Button
      variant="link"
      onClick={onLogOut}
      className={cn("w-max gap-3 p-0 text-lg font-medium text-foreground", className)}
    >
      <ExitIcon className="h-7 w-7" />
      Logout
    </Button>
  )
}
