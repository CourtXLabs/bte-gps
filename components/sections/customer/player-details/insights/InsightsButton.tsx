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
      <div className="w-full max-w-7xl md:w-max">
        <Button className="w-full gap-1 md:w-max" size="lg" onClick={isDialogOpen.onTrue}>
          <LightbulbIcon />
          <span>View Insights</span>
        </Button>
      </div>
      {isDialogOpen.value && (
        <InsightsDialog canEdit={canEdit} open={isDialogOpen.value} onOpenChange={isDialogOpen.onToggle} id={id} />
      )}
    </>
  )
}
