import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <div className="w-full bg-black p-4">
      <div className="mx-auto max-w-screen-2xl">
        <Link href="/">
          <Image src="/logo.jpeg" alt="logo" width={200} height={60} />
        </Link>
      </div>
    </div>
  )
}
