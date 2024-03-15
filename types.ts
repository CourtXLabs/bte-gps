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
    | "play_code"
    | "initial_direction"
    | "counter_direction"
    | "last_dribble_type"
    | "type_of_shot"
    | "pick_and_roll"
    | "defender_pick_and_roll"
    | "ball_handler_pick_and_roll"
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
  play_code: string | null
  initial_direction: string | null
  counter_direction: string | null
  last_dribble_type: string | null
  type_of_shot: string | null
  pick_and_roll: string | null
  defender_pick_and_roll?: string | null
  ball_handler_pick_and_roll?: string
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

export interface PlayerInfo {
  name: string
  points: number
  game: string
  date: string
}

export interface GameSaveData {
  name: string
  sequences: any[]
  playerInfo: PlayerInfo
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
  play_code: z.string().min(1, { message: errorMessage }),
  initial_direction: z.string().min(1, { message: errorMessage }),
  counter_direction: z.string().min(1, { message: errorMessage }),
  last_dribble_type: z.string().min(1, { message: errorMessage }),
  type_of_shot: z.string().min(1, { message: errorMessage }),
  pick_and_roll: z.string().min(1, { message: errorMessage }),
  defender_pick_and_roll: z.string().optional(),
  ball_handler_pick_and_roll: z.string().optional(),
})

export interface TeamData {
  id?: string
  name: string
}

export interface PlayerData {
  id?: string
  name: string
  jersey: string
  team_id: string
}
