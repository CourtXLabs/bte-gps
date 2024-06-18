"use client"

import Bold from "@tiptap/extension-bold"
import Heading from "@tiptap/extension-heading"
import Italic from "@tiptap/extension-italic"
import Underline from "@tiptap/extension-underline"
import { EditorProvider } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Toolbar from "./toolbar"

const Tiptap = () => {
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
        Bold,
        Italic,
        Underline,
      ]}
      content={"<p>Hello World 🌎️</p>"}
    ></EditorProvider>
  )
}

export default Tiptap
