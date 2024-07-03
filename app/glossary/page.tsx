import Glossary from "@/components/sections/glossary/Glossary"
import AuthGuard from "@/guards/AuthGuard"

export default async function GlossaryPage() {
  return (
    <AuthGuard>
      <Glossary />
    </AuthGuard>
  )
}
