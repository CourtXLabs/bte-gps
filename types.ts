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

export interface MoveSequence {
  uid: string
  moveId: number
  x: number
  y: number
  color?: string
}

export interface Sequence {
  moves: MoveSequence[]
  playCode: string | null
  initialDirection: string | null
  counterDirection: string | null
  lastDribbleType: string | null
  typeOfShot: string | null
  pickAndRoll: string | null
  defenderPickAndRoll?: string | null
  ballHandlerPickAndRoll?: string
  period: number
}

export interface Game {
  gameType: GameTypes
  playerName: string
  teamName: string
  opponentName: string
  jersey: string
  date: Date
  sequences: Sequence[]
}

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const errorMessage = "This field is required"
export const gameFormSchema = z.object({
  gameType: z.nativeEnum(GameTypes),
  playerName: z.string().min(1, { message: errorMessage }),
  teamName: z.string().min(1, { message: errorMessage }),
  opponentName: z.string().min(1, { message: errorMessage }),
  jersey: z.string().min(1, { message: errorMessage }),
  date: z.date(),
})

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
