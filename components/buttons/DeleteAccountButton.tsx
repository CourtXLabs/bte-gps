"use client"

import { deleteAccount } from "@/app/(main)/account/settings/actions"
import useBoolean from "@/hooks/useBoolean"
import ConfirmDeleteAccountDialog from "../dialogs/ConfrimDeleteAccountDialog"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"

export default function DeleteAccountButton() {
  const isDialogOpen = useBoolean()
  const { toast } = useToast()

  const onSubmit = async () => {
    isDialogOpen.onFalse()
    const { error } = await deleteAccount()
    if (error) {
      toast({ variant: "destructive", title: error })
    } else {
      toast({ title: "Account deleted" })
      setTimeout(() => {
        window.location.href = "/"
      }, 1000)
    }
  }

  return (
    <>
      <Button
        variant="link"
        className="p-0 text-base text-destructive hover:no-underline"
        onClick={isDialogOpen.onTrue}
      >
        Delete Account
      </Button>
      <ConfirmDeleteAccountDialog open={isDialogOpen.value} onOpenChange={isDialogOpen.onToggle} onSubmit={onSubmit} />
    </>
  )
}
