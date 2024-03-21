import AuthGuard from "@/guards/AuthGuard"

export default async function Home() {
  return <AuthGuard>Hello Customer!</AuthGuard>
}
