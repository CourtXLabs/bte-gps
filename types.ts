import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
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
