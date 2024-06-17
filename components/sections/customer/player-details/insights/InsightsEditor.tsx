import { Insights } from "@/types"
import { useState } from "react"

interface Props {
  initialData?: Insights
}

export default function InsightsEditor({ initialData }: Props) {
  const [data, setData] = useState(initialData)

  const onChange = (editorState: any) => {
    setData(editorState)
  }

  return <div>Editor!</div>
}
