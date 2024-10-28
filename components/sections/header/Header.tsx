import PremiumVersionBanner from "@/components/banners/PremiumVersionBanner"
import { getIsAdmin, getIsLoggedIn, getIsPremium, getUserData } from "@/lib/auth"
import DesktopHeader from "./DesktopHeader"
import MobileHeader from "./MobileHeader"

export default async function Header() {
  const isAdmin = await getIsAdmin()
  const isPremiumUser = await getIsPremium()
  const isLoggedIn = await getIsLoggedIn()
  const userData = await getUserData()

  const userEmail = userData?.email
  const userFullName = userData?.user_metadata?.name

  const showPremiumBanner = isLoggedIn && !isPremiumUser && !isAdmin

  return (
    <>
      <div className="w-full bg-black p-4">
        <DesktopHeader isAdmin={isAdmin} isLoggedIn={isLoggedIn} userEmail={userEmail} userFullName={userFullName} />
        <MobileHeader isAdmin={isAdmin} isLoggedIn={isLoggedIn} userEmail={userEmail} userFullName={userFullName} />
      </div>
      {showPremiumBanner && <PremiumVersionBanner />}
    </>
  )
}
