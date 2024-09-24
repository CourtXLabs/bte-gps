import Link from "next/link"

interface Props {
  link: string
  title: string
  description: string
}

export default function BteCard({ link, title, description }: Props) {
  return (
    <Link href={link} className="w-full space-y-3 rounded-md bg-card p-6 hover:bg-accent lg:w-60">
      <h3 className="text-xl font-bold leading-none text-white">{title}</h3>
      <p className="text-lg">{description}</p>
    </Link>
  )
}
