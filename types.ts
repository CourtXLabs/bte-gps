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
  isFinalMove?: boolean
}

export interface SequenceInput {
  name:
    | "playCode"
    | "initialDirection"
    | "counterDirection"
    | "lastDribbleType"
    | "typeOfShot"
    | "pickAndRoll"
    | "defenderPickAndRoll"
    | "ballHandlerPickAndRoll"
  label: string
  options: { value: string; label: string }[]
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

const errorMessage = "This field is required"
export const sequenceFormSchema = z.object({
  playCode: z.string().min(1, { message: errorMessage }),
  initialDirection: z.string().min(1, { message: errorMessage }),
  counterDirection: z.string().min(1, { message: errorMessage }),
  lastDribbleType: z.string().min(1, { message: errorMessage }),
  typeOfShot: z.string().min(1, { message: errorMessage }),
  pickAndRoll: z.string().min(1, { message: errorMessage }),
  defenderPickAndRoll: z.string().optional(),
  ballHandlerPickAndRoll: z.string().optional(),
})
