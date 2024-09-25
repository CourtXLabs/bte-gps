import Link from "next/link"

export default function PremiumVersionBanner() {
  return (
    <div className="bg-[#892110] px-4 py-2.5 text-center">
      You are on the freemium version right now,{" "}
      <Link
        className="font-bold underline"
        href="/premium
      "
      >
        upgrade to premium
      </Link>{" "}
      to unlock features like live streaming, detailed analytics, court visualization and many more!
    </div>
  )
}
