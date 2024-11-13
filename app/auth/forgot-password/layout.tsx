import Image from "next/image"

interface Props {
  children: React.ReactNode
}

export default function ForgetPasswordLayout({ children }: Props) {
  return (
    <>
      {children}
      <div className="relative hidden w-[735px] lg:block">
        <Image
          src="/auth/forgot-password.png"
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
