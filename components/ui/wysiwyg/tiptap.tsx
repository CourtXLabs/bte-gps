"use client"

import Heading from "@tiptap/extension-heading"
import Image from "@tiptap/extension-image"
import Underline from "@tiptap/extension-underline"
import { EditorProvider } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Toolbar from "./toolbar"

interface Props {
  content?: string
  onUpdate: any
}

const Tiptap = ({ content, onUpdate }: Props) => {
  return (
    <EditorProvider
      autofocus
      slotBefore={<Toolbar />}
      extensions={[
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: false,
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false,
          },
        }),
        Heading.configure({ levels: [1, 2, 3, 4] }),
        Underline,
        Image,
      ]}
      content={content}
      onUpdate={onUpdate}
    ></EditorProvider>
  )
}

export default Tiptap
