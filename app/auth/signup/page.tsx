"use client"

import Logo from "@/components/Logo"
import AuthButton from "@/components/buttons/AuthButton"
import TermsDisclaimer from "@/components/sections/TermsDisclaimer"
import { buttonVariants } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { cn } from "@/lib/utils"
import { signupFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signUp } from "./actions"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    setLoading(true)
    await signUp(values)
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-md space-y-5 lg:w-[30%] lg:max-w-none lg:p-14 lg:pl-0 lg:pr-0 xl:pl-14"
      >
        <div className="mx-auto w-max">
          <Logo />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-3">
          <AuthButton disabled={loading} type="submit">
            Let's Get Started
          </AuthButton>
        </div>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className={cn(buttonVariants({ variant: "link" }), "p-0")}>
            Login
          </Link>
        </p>
        <TermsDisclaimer />
      </form>
    </Form>
  )
}
