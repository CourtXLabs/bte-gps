import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "../ui/button"

export default function Footer() {
  return (
    <div className="w-full bg-background">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex">
          <div>
            <Image src="/footer-image.png" alt="logo" width={544} height={427} />
          </div>
          <div className="flex flex-1 flex-col gap-20 px-11 py-6 text-[#94A3B8]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <p className="text-xs">Contact us at</p>
                <a href="mailto:info@bteanalaytics.com" className="text-5xl font-extrabold text-primary">
                  info@bteanalaytics.com
                </a>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <Link href="/privacy-policy">Privacy Policy </Link>
                <Link href="/terms-of-service">Terms of Service </Link>
              </div>
            </div>
            <div className="mt-auto flex items-end justify-between">
              <div>
                <p className="text-xs">Our socials</p>
                <ul className="pl-0 pt-3 uppercase">
                  <li>
                    <Link
                      className={cn(buttonVariants({ variant: "link" }), "p-0 text-5xl font-extrabold ")}
                      href="https://twitter.com/bteanalytics"
                    >
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={cn(buttonVariants({ variant: "link" }), "p-0 pt-1.5 text-5xl font-extrabold ")}
                      href="https://www.linkedin.com/company/bte-analytics"
                    >
                      LinkedIn
                    </Link>
                  </li>
                </ul>
              </div>
              <p className="text-xs">© BTE Analytics | 559438-9610 | All rights reserved</p>
            </div>
          </div>
        </div>
        <p className="py-12 text-center text-8xl font-extrabold uppercase">BTE Analytics</p>
      </div>
    </div>
  )
}
