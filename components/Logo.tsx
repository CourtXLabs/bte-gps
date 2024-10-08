import Image, { ImageProps } from "next/image"
import Link from "next/link"

type LogoProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  src?: string
  alt?: string
  width?: number
  height?: number
}

export default function Logo({ src = "/logo.jpeg", alt = "logo", width = 200, height = 60, ...props }: LogoProps) {
  return (
    <Link href="/">
      <Image src={src} alt={alt} width={width} height={height} {...props} />
    </Link>
  )
}
