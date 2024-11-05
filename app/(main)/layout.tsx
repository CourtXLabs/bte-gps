import Footer from "@/components/sections/Footer"
import Header from "@/components/sections/header/Header"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
