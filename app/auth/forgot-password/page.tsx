"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { forgotPasswordFormSchema } from "@/types"
import formatApiError from "@/utils/format-api-error"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { forgotPassword } from "./actions"

export default function LoginPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
    setLoading(true)
    const { error } = await forgotPassword(values)

    if (error) {
      toast({ variant: "destructive", title: formatApiError(error) })
    } else {
      toast({ title: "Password reset email sent" })
    }

    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex max-w-md flex-col gap-6 px-6 pt-20">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="font-semibold uppercase" type="submit">
          Reset Password
        </Button>
      </form>
    </Form>
  )
}
