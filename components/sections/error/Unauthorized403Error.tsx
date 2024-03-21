import Link from "next/link"

export default function Unauthorized403Error() {
  return (
    <div>
      You do not have enough permissions to view this page.
      <div className="mt-2 flex gap-4">
        <Link href="/login" className="underline">
          Log in
        </Link>
        <Link href="/" className="underline">
          Go back to the homepage
        </Link>
      </div>
    </div>
  )
}
