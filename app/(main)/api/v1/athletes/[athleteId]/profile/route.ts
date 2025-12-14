/**
 * Next.js API Route: Get Athlete Profile
 * 
 * Endpoint: GET /api/v1/athletes/[athleteId]/profile
 * 
 * This route proxies to Supabase to get athlete profile data.
 * Used by Vercel deployment when FastAPI backend is not available.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Force dynamic rendering - no caching for player profiles (data changes frequently)
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Increase timeout for Vercel serverless function (default is 10s, max is 60s for Hobby, 300s for Pro)
export const maxDuration = 30

export async function GET(
  request: NextRequest,
  { params }: { params: { athleteId: string } }
) {
  try {
    const athleteId = params.athleteId

    if (!athleteId) {
      return NextResponse.json(
        { error: 'Athlete ID is required' },
        { status: 400 }
      )
    }

    // Get Supabase credentials from environment variables
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials')
      return NextResponse.json(
        {
          error: 'Server configuration error',
          message: 'Supabase credentials not configured'
        },
        { status: 500 }
      )
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Query athlete from database with timeout protection
    let athlete: any = null
    let error: any = null

    const queryPromise = supabase
      .from('athletes')
      .select('*')
      .eq('athlete_id', athleteId)
      .maybeSingle()

    // 25 second timeout (Vercel max is 30s, leave buffer)
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('timeout')), 25000)
    })

    try {
      // Type assertion: Promise.race will return queryPromise result (timeout would reject)
      const result = (await Promise.race([queryPromise, timeoutPromise])) as {
        data: any
        error: any
      }
      // If we get here, query completed (timeout would have rejected)
      athlete = result.data
      error = result.error
    } catch (timeoutError: any) {
      if (timeoutError.message?.includes('timeout')) {
        return NextResponse.json(
          {
            error: 'Query timeout',
            athlete_id: athleteId,
            message: 'Database query took too long. Please try again.'
          },
          { status: 504 }
        )
      }
      // Re-throw if it's not a timeout error
      throw timeoutError
    }

    if (error) {
      console.error('Supabase query error:', error)
      return NextResponse.json(
        {
          error: 'Database query failed',
          athlete_id: athleteId,
          details: error.message,
          code: error.code
        },
        { status: 500 }
      )
    }

    if (!athlete) {
      console.log('Athlete not found in database:', athleteId)
      return NextResponse.json(
        {
          error: 'Athlete not found',
          athlete_id: athleteId,
          message: 'No athlete found with this ID in the database'
        },
        { status: 404 }
      )
    }

    console.log('Athlete found:', athlete.athlete_name)

    // Transform to match expected API response format
    const profile = {
      athlete_id: athlete.athlete_id,
      athlete_name: athlete.athlete_name || athlete.name || 'Unknown',
      position: athlete.position || null,
      team: athlete.team || null,
      school: athlete.school || null,
      graduation_year: athlete.graduation_year || null,
      height: athlete.height || null,
      weight: athlete.weight || null,
      bio: athlete.bio || null,
      profile_image_url: athlete.profile_image_url || athlete.image_url || null,
      
      // Map game_stats_cache to traditional_stats for frontend
      traditional_stats: athlete.game_stats_cache ? {
        points: athlete.game_stats_cache.points || athlete.game_stats_cache.points_per_game || null,
        rebounds: athlete.game_stats_cache.rebounds || athlete.game_stats_cache.rebounds_per_game || null,
        assists: athlete.game_stats_cache.assists || athlete.game_stats_cache.assists_per_game || null,
        steals: athlete.game_stats_cache.steals || athlete.game_stats_cache.steals_per_game || null,
        blocks: athlete.game_stats_cache.blocks || athlete.game_stats_cache.blocks_per_game || null,
        turnovers: athlete.game_stats_cache.turnovers || athlete.game_stats_cache.turnovers_per_game || null,
        field_goal_percentage: athlete.game_stats_cache.field_goal_percentage || athlete.game_stats_cache.fg_percentage || null,
        three_point_percentage: athlete.game_stats_cache.three_point_percentage || athlete.game_stats_cache.three_pt_percentage || null,
        free_throw_percentage: athlete.game_stats_cache.free_throw_percentage || athlete.game_stats_cache.ft_percentage || null,
      } : null,
      
      // Performance stats from performance_stats_cache
      performance_stats: athlete.performance_stats_cache || null,
      
      // Social media data
      social_media: athlete.social_media || null,
      
      // Highlights
      highlights: athlete.highlights || null,
      
      // IQ scores
      iq_scores: athlete.iq_scores || null,
      
      // Metadata
      game_stats_source: athlete.game_stats_source || 'unknown',
      last_stats_update: athlete.last_stats_update || null,
      created_at: athlete.created_at || null,
      updated_at: athlete.updated_at || null,
    }

    return NextResponse.json(profile, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })

  } catch (err: any) {
    console.error('Error fetching athlete profile:', err)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: err.message || 'An unexpected error occurred',
        athlete_id: params?.athleteId || 'unknown'
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
