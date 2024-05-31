import { CustomJWTPayload, Roles } from "@/types"
import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import { createClient } from "./supabase/server"

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error("JWT Secret key is not set")
  }

  const enc: Uint8Array = new TextEncoder().encode(secret)
  return enc
}

export async function verifyJwtToken(token: string): Promise<CustomJWTPayload | null> {
  try {
    const { payload } = await jwtVerify<CustomJWTPayload>(token, getJwtSecretKey())

    return payload
  } catch (error) {
    return null
  }
}

export async function getJwt(): Promise<CustomJWTPayload | null> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: sessionData } = await supabase.auth.getSession()

  const accessToken = sessionData?.session?.access_token

  if (accessToken) {
    try {
      const payload = await verifyJwtToken(accessToken)
      return payload
    } catch (error) {
      return null
    }
  }
  return null
}

export async function verifyAuthToken(token: string): Promise<boolean> {
  try {
    const decodedJwt = await verifyJwtToken(token)
    if (!decodedJwt) {
      return false
    }
    return decodedJwt.user_roles?.includes(Roles.ADMIN)
  } catch (error) {
    return false
  }
}

export async function getIsAdmin() {
  const decodedJwt = await getJwt()
  if (!decodedJwt) {
    return false
  }

  return decodedJwt.user_roles?.includes(Roles.ADMIN)
}

export async function getUserRoles(token: string) {
  const decodedJwt = await verifyJwtToken(token)
  if (!decodedJwt) {
    return []
  }
  return decodedJwt.user_roles
}
