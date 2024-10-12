"use client"

import Logo from "@/components/Logo"
import AuthButton from "@/components/buttons/AuthButton"
import TermsDisclaimer from "@/components/sections/TermsDisclaimer"
import { buttonVariants } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { toast } from "@/components/ui/use-toast"
import useBoolean from "@/hooks/useBoolean"
import { cn } from "@/lib/utils"
import { signupFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signUp } from "./actions"

export default function LoginPage() {
  const isLoading = useBoolean()
  const isSuccess = useBoolean()
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
    isLoading.onTrue()
    const { data, error } = await signUp(values)
    if (!error) {
      isSuccess.onTrue()
    } else {
      toast({ variant: "destructive", title: error })
    }
    isLoading.onFalse()
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
        {isSuccess.value ? (
          <p className="pt-6 text-center">
            Thank you for signing up! We sent you an email at {form.getValues("email")} to confirm your account.
          </p>
        ) : (
          <>
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
              <AuthButton disabled={isLoading.value} type="submit">
                Let&apos;s Get Started
              </AuthButton>
            </div>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className={cn(buttonVariants({ variant: "link" }), "p-0")}>
                Login
              </Link>
            </p>
          </>
        )}
        <TermsDisclaimer />
      </form>
    </Form>
  )
}
