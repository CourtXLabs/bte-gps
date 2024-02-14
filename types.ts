import { z } from "zod"

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

export enum GameTypes {
  COLLEGE = "College Game",
  HIGH_SCHOOL = "High School Game",
  PROFESSIONAL = "Professional Game",
}

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const gameFormSchema = z.object({
  gameType: z.nativeEnum(GameTypes),
  playerName: z.string().email(),
  teamName: z.string().email(),
  opponentName: z.string().email(),
  jersey: z.number(),
  date: z.date(),
})

export const sequenceFormSchema = z.object({
  playCode: z.string(),
  initialDirection: z.string(),
  counterDirection: z.string(),
  lastDribbleType: z.string(),
  typeOfShot: z.string(),
  pickAndRoll: z.string(),
  defenderPickAndRoll: z.string().optional(),
  ballHandlerPickAndRoll: z.string().optional(),
})
