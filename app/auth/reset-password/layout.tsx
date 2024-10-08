import Image from "next/image"

interface Props {
  children: React.ReactNode
}

export default function ResetPasswordLayout({ children }: Props) {
  return (
    <>
      {children}
      <div className="relative hidden flex-1 lg:block">
        <Image src="/auth-image.png" alt="Auth Image" layout="fill" objectFit="cover" quality={100} priority />
      </div>
    </>
  )
}
