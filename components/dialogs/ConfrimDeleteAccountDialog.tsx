import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../ui/button"

interface Props {
  open: boolean
  onOpenChange: () => void
  onSubmit: () => void
}

export default function ConfirmDeleteAccountDialog({ open, onOpenChange, onSubmit }: Props) {
  const onClickSubmit = () => {
    onSubmit()
    onOpenChange()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="border-b-2 border-accent pb-6">
            Are you sure you want to delete your account?
          </DialogTitle>
        </DialogHeader>
        <p>This action is irreversible. You will lose any active subscriptions.</p>
        <DialogFooter className="pt-2 sm:justify-start">
          <Button variant="destructive" type="button" onClick={onClickSubmit}>
            Submit
          </Button>
          <Button type="button" variant="outline" onClick={onOpenChange}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
