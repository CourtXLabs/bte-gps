/**
 * BTE Stats Section Component
 * 
 * Server Component that displays BTE Advanced Statistics
 * Fetches data from Supabase athletes table
 * 
 * Research-backed: Uses Next.js 14 Server Component pattern for optimal performance
 * Source: https://nextjs.org/docs/14/app/building-your-application/rendering/composition-patterns
 */

import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

interface BTEStatsSectionProps {
  athleteId: string
}

interface BTEStat {
  label?: string
  value: number | string
  display_value?: string
  description?: string
}

export default async function BTEStatsSection({ athleteId }: BTEStatsSectionProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    // First, try to find athlete by athlete_id (direct match)
    let { data: athlete, error } = await supabase
      .from('athletes')
      .select('performance_stats_cache')
      .eq('athlete_id', athleteId)
      .maybeSingle()

    // If not found, try to find by matching player.id to athlete_id
    // (The player table might use the same ID as athlete_id)
    if (error || !athlete) {
      // Try querying with the ID as-is (in case player.id === athlete_id)
      const retry = await supabase
        .from('athletes')
        .select('performance_stats_cache')
        .eq('athlete_id', athleteId)
        .maybeSingle()
      
      if (!retry.error && retry.data) {
        athlete = retry.data
        error = null
      }
    }

    if (error || !athlete) {
      console.error('Error fetching BTE stats:', error)
      return null
    }

    // Extract BTE stats from performance_stats_cache
    const performanceStats = athlete.performance_stats_cache
    const bteStats = performanceStats?.bte_stats_and_insights?.stats

    // If no BTE stats, don't render section
    if (!bteStats || Object.keys(bteStats).length === 0) {
      return null
    }

    return (
      <section 
        id="bte-advanced-stats-section" 
        className="mt-8"
        aria-label="BTE Advanced Statistics"
      >
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              BTE Advanced Stats
            </h2>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
              PROPRIETARY METRICS
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Advanced analytics metrics that provide deeper insights into performance. These proprietary BTE stats are not available on standard stat sheets.
          </p>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          role="list"
          aria-label="BTE advanced statistics list"
        >
          {Object.entries(bteStats).map(([key, stat]: [string, BTEStat]) => (
            <div
              key={key}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border-2 border-purple-200 dark:border-purple-800 p-4 hover:shadow-lg transition-all"
              role="listitem"
              aria-label={`${stat.label || key}: ${stat.display_value || stat.value}`}
            >
              <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-1">
                {stat.label || key}
              </div>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-200 mb-1">
                {stat.display_value || (typeof stat.value === 'number' ? stat.value.toFixed(2) : stat.value)}
              </div>
              {stat.description && (
                <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error rendering BTE Stats Section:', error)
    return null
  }
}
