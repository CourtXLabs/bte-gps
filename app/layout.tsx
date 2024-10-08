import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Onest } from "next/font/google"
import "./globals.css"

const onest = Onest({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"], variable: "--font-onest" })

export const metadata: Metadata = {
  title: "BTE GPS",
  description: "BTE GPS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background antialiased", onest.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
