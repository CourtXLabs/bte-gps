import AuthGuard from "@/guards/AuthGuard"

interface Props {
  children: React.ReactNode
}

export default function AccountLayout({ children }: Props) {
  return <AuthGuard>{children}</AuthGuard>
}
