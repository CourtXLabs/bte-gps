import Image from "next/image"
import { Suspense } from "react"

interface Props {
  children: React.ReactNode
}

export default function ResetPasswordLayout({ children }: Props) {
  return (
    <>
      <Suspense>{children}</Suspense>
      <div className="relative hidden flex-1 lg:block">
        <Image src="/auth-image.png" alt="Auth Image" layout="fill" objectFit="cover" quality={100} priority />
      </div>
    </>
  )
}
