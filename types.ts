import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const gameFormSchema = z.object({
  playerName: z.string().email(),
  teamName: z.string().email(),
  opponentName: z.string().email(),
  jersey: z.number(),
  date: z.date(),
})

export interface Coordinates {
  x: number
  y: number
}

export interface Option {
  id: number
  image?: string
  keyShortcut: string
  name: string
  color?: string
}
