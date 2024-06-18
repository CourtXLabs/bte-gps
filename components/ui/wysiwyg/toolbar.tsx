import { cn } from "@/lib/utils"
import { useCurrentEditor } from "@tiptap/react"
import {
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  StrikethroughIcon,
  Type,
  UnderlineIcon,
} from "lucide-react"

const itemClassname = "border p-1 border-gray-400 rounded-sm"
const activeItemClassname = "border-primary border"

const Toolbar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div>
      <div className="flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={cn(itemClassname, { [activeItemClassname]: editor.isActive("bold") })}
        >
          <BoldIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={cn(itemClassname, { [activeItemClassname]: editor.isActive("italic") })}
        >
          <ItalicIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={cn(itemClassname, { [activeItemClassname]: editor.isActive("underline") })}
        >
          <UnderlineIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={cn(itemClassname, { [activeItemClassname]: editor.isActive("strike") })}
        >
          <StrikethroughIcon />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn(itemClassname, { [activeItemClassname]: editor.isActive("heading", { level: 1 }) })}
        >
          <Heading1Icon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(itemClassname, { [activeItemClassname]: editor.isActive("heading", { level: 2 }) })}
        >
          <Heading2Icon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={cn(itemClassname, { [activeItemClassname]: editor.isActive("heading", { level: 3 }) })}
        >
          <Heading3Icon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={cn(itemClassname, { [activeItemClassname]: editor.isActive("heading", { level: 4 }) })}
        >
          <Heading4Icon />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={cn(itemClassname, { [activeItemClassname]: editor.isActive("paragraph") })}
        >
          <Type />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(itemClassname, { [activeItemClassname]: editor.isActive("bulletList") })}
        >
          <ListIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(itemClassname, { [activeItemClassname]: editor.isActive("orderedList") })}
        >
          <ListOrderedIcon />
        </button>
      </div>
    </div>
  )
}

export default Toolbar
