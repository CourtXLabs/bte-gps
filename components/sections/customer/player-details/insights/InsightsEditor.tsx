import { Button } from "@/components/ui/button"

interface Props {
  children?: React.ReactNode
  withSaveBtn?: boolean
  onSave: () => void
  isBtnDisabled: boolean
}

export default function InsightsEditor({ children, withSaveBtn, onSave, isBtnDisabled }: Props) {
  return (
    <div className="space-y-4">
      {children}
      {withSaveBtn && (
        <Button disabled={isBtnDisabled} onClick={onSave}>
          Save
        </Button>
      )}
    </div>
  )
}
