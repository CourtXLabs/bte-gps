import Image from "next/image"
import { Suspense } from "react"

interface Props {
  children: React.ReactNode
}

export default function ResetPasswordLayout({ children }: Props) {
  return (
    <>
      <Suspense>{children}</Suspense>
      <div className="relative hidden w-[735px] lg:block">
        <Image
          src="/auth/reset-password.png"
          alt="Auth Image"
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
          quality={100}
          priority
        />
      </div>
    </>
  )
}
