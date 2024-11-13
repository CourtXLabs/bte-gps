"use client"

import Logo from "@/components/Logo"
import AuthButton from "@/components/buttons/AuthButton"
import TermsDisclaimer from "@/components/sections/TermsDisclaimer"
import { buttonVariants } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { loginFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { login } from "./actions"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setLoading(true)
    const { error } = await login(values)
    if (error) {
      toast({ variant: "destructive", title: error })
    }
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-md space-y-5 lg:max-w-md lg:p-14 lg:pl-0 lg:pr-0"
      >
        <div className="mx-auto w-max">
          <Logo />
        </div>
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link href="/auth/forgot-password" className="text-sm text-[#afafaf]">
                  Forgot password
                </Link>
              </div>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-3">
          <AuthButton disabled={loading} type="submit">
            Log In
          </AuthButton>
        </div>
        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className={cn(buttonVariants({ variant: "link" }), "p-0")}>
            Register
          </Link>
        </p>
        <TermsDisclaimer />
      </form>
    </Form>
  )
}
