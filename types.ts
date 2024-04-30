import { z } from "zod"
import { MoveIds } from "./constants"

export interface Coordinates {
  x: number
  y: number
}

export enum Colors {
  POUND = "#E52127",
  CROSSOVER = "#1E4695",
  IN_AND_OUT = "#186D38",
  BETWEEN_THE_LEGS = "#814198",
  BEHIND_THE_BACK = "#FCD407",
  SPIN = "#FF9E1F",
}

export interface Option {
  id: MoveIds
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
  moveId: MoveIds
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
  error?: string | null
  name: string
  sequences: Sequence[]
  imageInfo: GPSApiData[]
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
  playerId: z.number().optional(),
  teamName: z.string().min(1, { message: errorMessage }),
  teamId: z.number().optional(),
  opponentName: z.string().min(1, { message: errorMessage }),
  opponentTeamId: z.number().optional(),
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

export const dashboardToolbarFormSchema = z.object({
  team: z.string().optional(),
  player: z.string().optional(),
})

export const playerDashboardToolbarFormSchema = z.object({
  player: z.string().optional(),
  game: z.string().optional(),
})

export interface TeamData {
  id?: string
  name: string
}

export interface PlayerData {
  id?: string
  name: string
  jersey: string | number
  team_id: string
}

// Input for API

export interface GameInput {
  type: string
  date: string
  home_team_id: number | string
  away_team_id: number | string
}

export interface ReportInput {
  game_id: number | string
  name: string
  player_id: number | string
}

export enum USER_ROLES {
  ADMIN = 1,
}

export interface PlayerApiData extends Omit<PlayerData, "team_id"> {
  team_id: TeamData[] | TeamData
}

export interface ReportApiData {
  id?: string
  name?: string
  player_id: PlayerApiData
  game_id: GameApiData
}

export interface GameApiData {
  id?: string
  date: string
  home_team_id: TeamData
  away_team_id: TeamData
}

export interface SequenceApiData extends Sequence {
  move: MoveSequence[]
}

export interface GPSApiData {
  id?: number
  created_at?: string
  period?: number
  url?: string
  report_id?: number
}

export interface EditMoveInput {
  sequenceIndex: number
  moveIndex: number
  newMove: MoveSequence
}

export interface DeleteMoveInput {
  sequenceIndex: number
  moveIndex: number
}

export interface Pagination {
  page: number
  pageSize: number
  total: number
}

export interface SimpleTeamData {
  id: number
  name: string
}

export interface SimlePlayerData {
  id: number
  name: string
  jersey: number
  team_id: number
}

export interface ComboToPointData {
  date: string
  comboCount: number
  points: number
}

export interface MoveApiData {
  code: number
  x: number
  y: number
}
