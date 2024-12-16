import { JWTPayload } from "jose"
import { z } from "zod"
import { userTypes } from "./constants/contact-us"
import { MoveIds } from "./constants/misc"

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
  HALF_SPIN = "#EE5BA0",
  SPIN = "#FF9E1F",
}

export const foregroundColors = {
  POUND: "#fff",
  CROSSOVER: "#fff",
  IN_AND_OUT: "#fff",
  BETWEEN_THE_LEGS: "#fff",
  BEHIND_THE_BACK: "#000",
  HALF_SPIN: "#000",
  SPIN: "#000",
}

export interface Option {
  id: MoveIds
  uid: string
  image?: string
  keyShortcut: string
  name: string
  color?: string
  shape?: "circle" | "square"
  isFinalMove?: boolean
  isFirstMove?: boolean
  isStartCombo?: boolean
  isLastCombo?: boolean
}

export interface SequenceInput {
  name:
    | "play_code"
    | "initial_direction"
    | "counter_direction"
    | "last_dribble_type"
    | "type_of_shot"
    | "screener_pick_and_roll"
    | "on_ball_defender_pick_and_roll"
    | "ball_handler_pick_and_roll"
  label: string
  options: { value: string; label: string }[]
}

export enum GameTypes {
  COLLEGE = "College Game",
  HIGH_SCHOOL = "High School Game",
  PROFESSIONAL = "Professional Game",
}

export enum LevelTypes {
  COLLEGE = "College",
  HIGH_SCHOOL = "High School",
  NBA = "NBA",
}

export interface MoveSequence {
  uid: string
  moveId: MoveIds
  x: number
  y: number
  color?: string
  shape?: "circle" | "square"
  combo?: number | null
}

export interface Sequence {
  moves?: MoveSequence[]
  moveUids?: string[]
  combos: MoveSequence[][]
  play_code: string | null
  initial_direction: string | null
  counter_direction: string | null
  last_dribble_type: string | null
  type_of_shot: string | null
  screener_pick_and_roll: string | null
  on_ball_defender_pick_and_roll?: string | null
  ball_handler_pick_and_roll?: string
  lanes_left?: string | null
  lanes_middle?: string | null
  lanes_right?: string | null
  period: number
}

export interface Game {
  gameType: GameTypes
  playerName: string
  homeTeam: string
  awayTeam: string
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

export const signupFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(1),
    name: z.string().min(2),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordFormSchema = z
  .object({
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const updatePasswordFormSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const personalInfoFormSchema = z.object({
  name: z.string().min(2),
})

export const changeEmailAddressFormSchema = z.object({
  email: z.string().email(),
})

export const contactUsFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  type: z.enum(userTypes),
  message: z.string().min(2),
})

const errorMessage = "This field is required"
export const gameFormSchema = z.object({
  gameType: z.nativeEnum(GameTypes),
  playerName: z.string().min(1, { message: errorMessage }),
  playerId: z.number().optional(),
  homeTeam: z.string().min(1, { message: errorMessage }),
  homeTeamId: z.number().optional(),
  awayTeam: z.string().min(1, { message: errorMessage }),
  awayTeamId: z.number().optional(),
  jersey: z.string().min(1, { message: errorMessage }),
  points: z.string(),
  date: z.date().optional(),
})

export const sequenceFormSchema = z.object({
  play_code: z.string().min(1, { message: errorMessage }),
  initial_direction: z.string().min(1, { message: errorMessage }),
  counter_direction: z.string().min(1, { message: errorMessage }),
  last_dribble_type: z.string().min(1, { message: errorMessage }),
  type_of_shot: z.string().min(1, { message: errorMessage }),
  screener_pick_and_roll: z.string().min(1, { message: errorMessage }),
  on_ball_defender_pick_and_roll: z.string().optional(),
  ball_handler_pick_and_roll: z.string().optional(),
})

export const playerListToolbarFormSchema = z.object({
  player_level: z.nativeEnum(LevelTypes).optional(),
  team: z.string().optional(),
  player: z.string().optional(),
})

export const playerDashboardToolbarFormSchema = z.object({
  player: z.string().optional(),
  game: z.string().optional(),
})

export enum PeriodName {
  HALF = "Half",
  QUARTER = "Quarter",
}

export interface PeriodToWord {
  [key: number]: string
}

export interface TeamData {
  id?: string
  code?: string
  name: string
  abbreviation: string
}

export interface PlayerData {
  id?: string
  name: string
  jersey: string | number
  team_id: string
  player_level?: keyof typeof LevelTypes | null
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
  points?: number
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
  sequence: SequenceApiData[]
  points?: number
}

export interface GameApiData {
  id?: string
  date: string
  home_team_id: TeamData
  away_team_id: TeamData
}

export interface ComboApiData {
  id?: number
  move?: MoveApiData[]
}
export interface SequenceApiData extends Sequence {
  id?: number
  move: MoveApiData[]
  combo: MoveApiData[]
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
  player_photo?: string | null
  dribble_graph_image?: string | null
  free_playlist_id?: string | null
}

export interface ComboToPointData {
  date: string
  comboCount: number
  points: number
}

export interface SequenceCombosData {
  sequence: string
  count: number
}

export interface MoveApiData {
  code: number
  x: number
  y: number
}

export interface DribbleChartApiData {
  id: number
  player_id: number
  game_id: {
    date: string
  }[]
  sequence: {
    initial_direction: string
    counter_direction: string
    last_dribble_type: string
    move: {
      code: any
    }[]
    combo: {
      move: {
        code: any
      }[]
    }[]
  }[]
}

export enum Roles {
  ADMIN = "ADMIN",
  PREMIUM = "PREMIUM",
}

export interface CustomJWTPayload extends JWTPayload {
  user_roles: Roles[]
}

export interface SeuqenceGraphData {
  moveCounts: Record<string, Record<string, number>> | null
  comboCounts: SequenceCombosData[]
  seuqenceInfoCounts: {
    initialDirectionCounts: Record<string, Record<string, number>>
    counterDirectionCounts: Record<string, Record<string, number>>
    lastDribbleTypeCounts: Record<string, Record<string, number>>
  }
  error: null
}

export interface IGraphFilters {
  dribbles: boolean
  dribbleTypes: boolean
  initialDirection: boolean
  counterDirection: boolean
  lastHand: boolean
}

export interface Insights {
  insights: string
}

export type gameLimitOptions = "all" | "5" | "10" | "away" | "home"

export interface Margin {
  top: number
  right: number
  bottom: number
  left: number
}

export interface TimelineItem {
  title: string
  description?: string
  type: "primary" | "secondary"
}
