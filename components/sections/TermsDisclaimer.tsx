import Link from "next/link"

export default function TermsDisclaimer() {
  return (
    <p className="pt-6 text-center text-xs text-[#9f9f9f]">
      By continuing, you agree to BTE&apos;s{" "}
      <Link href="/terms-of-service" className="hover-text-white font-semibold underline hover:text-[#afafaf]">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="/privacy-policy" className="hover-text-white font-semibold underline hover:text-[#afafaf]">
        Privacy Policy
      </Link>
      .
    </p>
  )
}
