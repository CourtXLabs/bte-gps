import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { base64ToBlob } from "@/utils/get-svg-court"
import { generateRandomString } from "@/utils/misc"
import { useCurrentEditor } from "@tiptap/react"
import {
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  ImageIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  StrikethroughIcon,
  Type,
  UnderlineIcon,
} from "lucide-react"
import { useRef } from "react"
import { toast } from "../use-toast"

const itemClassname = "border p-1 border-gray-400 rounded-sm"
const activeItemClassname = "border-primary border"

const Toolbar = () => {
  const supabase = createClient()
  const { editor } = useCurrentEditor()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  if (!editor) {
    return null
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target!.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async () => {
        const type = file.type
        const imageBase64 = reader.result as string
        const imageBlob = base64ToBlob(imageBase64, type)
        const imageName = `${file.name}-${generateRandomString()}`

        await supabase.storage.from("Player Insights").upload(imageName, imageBlob, {
          contentType: type,
        })
        const { error, data: imageUrlData } = await supabase.storage
          .from("Player Insights")
          .createSignedUrls([imageName], 3153600000)

        if (error) {
          toast({ variant: "destructive", title: "Failed to upload image" })
        }

        editor
          .chain()
          .focus()
          .setImage({
            src: imageUrlData?.[0].signedUrl!,
          })
          .run()
      }
      reader.readAsDataURL(file)
    }
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
        <button onClick={() => fileInputRef.current!.click()} className={itemClassname}>
          <ImageIcon />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </div>
    </div>
  )
}

export default Toolbar
