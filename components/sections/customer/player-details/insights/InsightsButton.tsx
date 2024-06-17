"use client"

import { Button } from "@/components/ui/button"
import useBoolean from "@/hooks/useBoolean"
import { LightbulbIcon } from "lucide-react"
import InsightsDialog from "./InsightsDialog"

interface Props {
  id: string
  canEdit?: boolean
}

export default function InsightsButton({ id, canEdit }: Props) {
  const isDialogOpen = useBoolean(false)

  return (
    <>
      <div className="mx-auto w-full max-w-7xl">
        <Button className="w-max gap-1" onClick={isDialogOpen.onTrue}>
          <LightbulbIcon />
          <span>Insights</span>
        </Button>
      </div>
      <InsightsDialog canEdit={canEdit} open={isDialogOpen.value} onOpenChange={isDialogOpen.onToggle} id={id} />
    </>
  )
}
