import Image from "next/image"

interface Props {
  children: React.ReactNode
}

export default function LoginLayout({ children }: Props) {
  return (
    <>
      {children}
      <div className="relative hidden w-[820px] lg:block">
        <Image
          src="/auth/auth-image.png"
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
