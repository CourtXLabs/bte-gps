/**
 * BTE Socials Section Component
 * 
 * Server Component that displays BTE Social Media data
 * Fetches data from Supabase athletes table
 * 
 * Research-backed: Uses Next.js 14 Server Component pattern for optimal performance
 * Source: https://nextjs.org/docs/14/app/building-your-application/rendering/composition-patterns
 */

import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

interface BTESocialsSectionProps {
  athleteId: string
}

interface SocialMediaData {
  likeness_iq_score?: number
  brand_tier?: string
  total_followers?: number
  estimated_post_value?: number
  estimated_highlight_value?: number
  instagram_handle?: string
  twitter_handle?: string
  tiktok_handle?: string
}

export default async function BTESocialsSection({ athleteId }: BTESocialsSectionProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    // Query athletes table directly (player table uses bigint, not UUID)
    // Note: athletes table has social_data_cache, not social_media column
    const { data: athlete, error } = await supabase
      .from('athletes')
      .select('social_data_cache')
      .eq('athlete_id', athleteId)
      .maybeSingle()

    if (error || !athlete) {
      console.error('Error fetching BTE socials:', error)
      return null
    }

    // Use social_data_cache (social_media column doesn't exist in schema)
    const socialMedia: SocialMediaData | null = athlete.social_data_cache

    // If no social media data, don't render section
    if (!socialMedia || Object.keys(socialMedia).length === 0) {
      return null
    }

    return (
      <section id="bte-socials-section" className="mt-8">
        <h2 className="text-xl font-semibold mb-4">BTE Socials</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialMedia.likeness_iq_score !== undefined && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800 p-4">
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
                Your Brand Value
              </div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-1">
                {socialMedia.likeness_iq_score.toFixed(1)}
              </div>
              {socialMedia.brand_tier && (
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {socialMedia.brand_tier} tier
                </div>
              )}
            </div>
          )}
          
          {socialMedia.total_followers !== undefined && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-2 border-green-200 dark:border-green-800 p-4">
              <div className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">
                Total Followers
              </div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-200 mb-1">
                {socialMedia.total_followers.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Across all platforms
              </div>
            </div>
          )}
          
          {socialMedia.estimated_post_value !== undefined && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border-2 border-purple-200 dark:border-purple-800 p-4">
              <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-1">
                Each Post Could Earn
              </div>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-200 mb-1">
                ${socialMedia.estimated_post_value.toFixed(0)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Estimated value per post
              </div>
            </div>
          )}
          
          {socialMedia.estimated_highlight_value !== undefined && (
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border-2 border-orange-200 dark:border-orange-800 p-4">
              <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide mb-1">
                Highlights Could Earn
              </div>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-200 mb-1">
                ${socialMedia.estimated_highlight_value.toFixed(0)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Per highlight
              </div>
            </div>
          )}
        </div>
        
        {(socialMedia.instagram_handle || socialMedia.twitter_handle || socialMedia.tiktok_handle) && (
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {socialMedia.instagram_handle && (
              <a
                href={`https://instagram.com/${socialMedia.instagram_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Instagram: @{socialMedia.instagram_handle}
              </a>
            )}
            {socialMedia.twitter_handle && (
              <a
                href={`https://twitter.com/${socialMedia.twitter_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Twitter: @{socialMedia.twitter_handle}
              </a>
            )}
            {socialMedia.tiktok_handle && (
              <a
                href={`https://tiktok.com/@${socialMedia.tiktok_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                TikTok: @{socialMedia.tiktok_handle}
              </a>
            )}
          </div>
        )}
      </section>
    )
  } catch (error) {
    console.error('Error rendering BTE Socials Section:', error)
    return null
  }
}
