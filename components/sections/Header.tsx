import { getIsAdmin } from "@/lib/auth"
import Image from "next/image"
import Link from "next/link"

export default async function Header() {
  const isAdmin = await getIsAdmin()
  return (
    <div className="w-full bg-black p-4">
      <div className="mx-auto flex max-w-screen-2xl items-center gap-6">
        <Link href="/">
          <Image src="/logo.jpeg" alt="logo" width={200} height={60} />
        </Link>
        <Link href="/about-us" className="text-lg font-medium">
          About Us
        </Link>
        <Link href="/glossary" className="text-lg font-medium">
          Glossary
        </Link>
        {isAdmin && (
          <Link href="/add-game" className="text-lg font-medium">
            Add Game
          </Link>
        )}
        <p className="ml-auto text-lg font-medium">BETA</p>
      </div>
    </div>
  )
}
