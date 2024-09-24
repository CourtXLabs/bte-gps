import { UserIcon } from "lucide-react"

interface Props {
  email?: string
  name?: string
}

export default function ProfileInfo({ email, name }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
        <UserIcon size={24} className="fill-white" />
      </div>
      <div className="space-y-1.5 text-sm">
        <p className="font-bold leading-none">{name}</p>
        <p className="leading-none">{email}</p>
      </div>
    </div>
  )
}
