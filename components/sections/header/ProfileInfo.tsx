"use client"

import { UserIcon } from "lucide-react"
import Link from "next/link"

interface Props {
  email?: string
  name?: string
  onClick?: () => void
}

export default function ProfileInfo({ email, name, onClick = () => {} }: Props) {
  return (
    <Link href="/account/settings" className="flex items-center gap-2.5" onClick={onClick}>
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
        <UserIcon size={24} className="fill-white" />
      </div>
      <div className="space-y-1.5 text-sm">
        <p className="font-bold leading-none">{name}</p>
        <p className="leading-none">{email}</p>
      </div>
    </Link>
  )
}
