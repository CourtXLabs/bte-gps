import AboutUs from "@/components/sections/about-us/AboutUs"
import AuthGuard from "@/guards/AuthGuard"

export default async function AboutUsPage() {
  return (
    <AuthGuard>
      <AboutUs />
    </AuthGuard>
  )
}
