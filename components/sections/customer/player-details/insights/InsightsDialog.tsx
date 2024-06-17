import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import useBoolean from "@/hooks/useBoolean"
import fetcher from "@/lib/swr/fetcher"
import { Insights } from "@/types"
import { Pencil } from "lucide-react"
import sanitizeHtml from "sanitize-html"
import useSWR from "swr"
import InsightsEditor from "./InsightsEditor"

interface Props {
  open: boolean
  onOpenChange: () => void
  canEdit?: boolean
  id: string
}

export default function InsightsDialog({ open, onOpenChange, canEdit, id }: Props) {
  const { data } = useSWR<Insights>(`/api/players/insights/${id}`, fetcher)

  const cleanHtml = sanitizeHtml(data?.insights || "")
  const isEditing = useBoolean(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="border-b-2 border-accent pb-6">Player Data Insights</DialogTitle>
        </DialogHeader>
        {canEdit && (
          <Button className="w-max gap-2 text-base" onClick={isEditing.onToggle}>
            {isEditing.value ? "Preview" : "Edit"}
            {!isEditing.value && <Pencil className="w-4" />}
          </Button>
        )}
        {isEditing.value ? (
          <InsightsEditor initialData={data} />
        ) : cleanHtml ? (
          <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        ) : (
          <div>No Insights for this Player Yet...</div>
        )}
      </DialogContent>
    </Dialog>
  )
}
