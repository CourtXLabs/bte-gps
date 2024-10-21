import AccountSidebar from "@/components/sections/account/AccountSidebar"
import AuthGuard from "@/guards/AuthGuard"

interface Props {
  children: React.ReactNode
}

export default function AccountLayout({ children }: Props) {
  return (
    <AuthGuard>
      <main className="mx-auto flex max-w-screen-2xl gap-10 px-4 py-12 2xl:px-0">
        <AccountSidebar />
        <div className="flex-1">{children}</div>
      </main>
    </AuthGuard>
  )
}
