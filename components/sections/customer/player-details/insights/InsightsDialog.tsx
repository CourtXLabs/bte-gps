import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import Tiptap from "@/components/ui/wysiwyg/tiptap"
import useBoolean from "@/hooks/useBoolean"
import { createClient } from "@/lib/supabase/client"
import fetcher from "@/lib/swr/fetcher"
import { Insights } from "@/types"
import { Editor } from "@tiptap/react"
import { Pencil } from "lucide-react"
import { useEffect, useState } from "react"
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
  const supabase = createClient()
  const { data: initialData } = useSWR<Insights>(`/api/players/insights/${id}`, fetcher)
  const [data, setData] = useState(initialData?.insights || "")

  const hasChanges = (initialData?.insights || "") !== data
  const cleanHtml = sanitizeHtml(data)
  const isEditing = useBoolean(false)
  const isLoading = useBoolean(false)

  const onUpdate = ({ editor }: { editor: Editor }) => {
    setData(editor.getHTML())
  }

  const onSave = async () => {
    isLoading.onTrue()
    const { error } = await supabase.from("player").upsert({ id, insights: { insights: data } })
    if (error) {
      toast({ variant: "destructive", title: "Failed to save insights" })
    } else {
      toast({ title: "Insights saved successfully" })
    }

    isLoading.onFalse()
  }

  useEffect(() => {
    setData(initialData?.insights || "")
  }, [initialData])

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
          <InsightsEditor withSaveBtn={hasChanges} onSave={onSave} isBtnDisabled={isLoading.value}>
            <Tiptap content={data} onUpdate={onUpdate} />
          </InsightsEditor>
        ) : cleanHtml ? (
          <div dangerouslySetInnerHTML={{ __html: cleanHtml }} className="insights tiptap" />
        ) : (
          <div>No Insights for this Player Yet...</div>
        )}
      </DialogContent>
    </Dialog>
  )
}
