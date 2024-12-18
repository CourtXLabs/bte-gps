import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "../ui/button"

export default function Footer() {
  return (
    <div className="w-full bg-[#141010]">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex">
          <div className="hidden w-[544px] justify-center bg-[#140E00] lg:flex">
            <Image src="/footer-image.png" alt="logo" width={201} height={402} />
          </div>
          <div className="flex flex-1 flex-col gap-10 px-6 py-6 text-[#94A3B8] lg:gap-20 lg:px-11">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center lg:gap-8">
              <div className="flex flex-col gap-2 lg:gap-3">
                <p className="text-xs">Contact us at</p>
                <a
                  href="mailto:info@beattheexpert.com"
                  className="text-2xl font-extrabold text-primary sm:text-4xl lg:text-5xl"
                >
                  info@beattheexpert.com
                </a>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <Link href="/privacy-policy" className="w-max">
                  Privacy Policy{" "}
                </Link>
                <Link href="/terms-of-service" className="w-max">
                  Terms of Service{" "}
                </Link>
              </div>
            </div>
            <div className="mt-auto flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs">Our socials</p>
                <ul className="pl-0 pt-3 uppercase">
                  <li>
                    <Link
                      className={cn(buttonVariants({ variant: "link" }), "p-0 text-4xl font-extrabold lg:text-5xl ")}
                      href="https://www.instagram.com/bte.analytics/"
                    >
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={cn(
                        buttonVariants({ variant: "link" }),
                        "p-0 pt-1.5 text-4xl font-extrabold lg:text-5xl ",
                      )}
                      href="https://www.linkedin.com/company/bte-analytics"
                    >
                      LinkedIn
                    </Link>
                  </li>
                </ul>
              </div>
              <p className="self-center text-center text-xs">© BTE Analytics | 559438-9610 | All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
