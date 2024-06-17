import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Insights } from "@/types"
import { Pencil } from "lucide-react"
import sanitizeHtml from "sanitize-html"

interface Props {
  open: boolean
  onOpenChange: () => void
  data?: Insights
  canEdit?: boolean
}

export default function InsightsDialog({ open, onOpenChange, data, canEdit }: Props) {
  const cleanHtml = sanitizeHtml(data?.insights || "")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="border-b-2 border-accent pb-6">Player Data Insights</DialogTitle>
        </DialogHeader>
        {canEdit && (
          <Button className="w-max gap-2 text-base">
            Edit <Pencil className="w-4" />
          </Button>
        )}
        {cleanHtml ? (
          <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        ) : (
          <div>No Insights for this Player Yet...</div>
        )}
      </DialogContent>
    </Dialog>
  )
}
