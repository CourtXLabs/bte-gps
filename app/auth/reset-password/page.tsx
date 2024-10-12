"use client"

import Logo from "@/components/Logo"
import { Button, buttonVariants } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input"
import { toast } from "@/components/ui/use-toast"
import useBoolean from "@/hooks/useBoolean"
import { cn } from "@/lib/utils"
import { resetPasswordFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { resetPassword } from "./actions"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const code = searchParams.get("code")
  const isLoading = useBoolean()
  const isSuccess = useBoolean()
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
    isLoading.onTrue()
    const { error } = await resetPassword({ ...values, code: code! })
    if (error) {
      toast({ variant: "destructive", title: error })
    } else {
      isSuccess.onTrue()
    }
    isLoading.onFalse()
  }

  if (!code) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center space-y-5 lg:w-[30%] lg:max-w-none lg:p-14 lg:pl-0 lg:pr-0 xl:pl-14">
        <div className="mx-auto w-max">
          <Logo />
        </div>
        <p className="text-center">The link is invalid or has expired. Please request a new one.</p>
        <Link
          href="/auth/forgot-password"
          className={cn(buttonVariants({ variant: "link" }), "p-0 text-center text-lg")}
        >
          Request a new link
        </Link>
      </div>
    )
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
          <div className="mx-auto flex w-max flex-col items-center pt-20">
            <Image src="/password-changed.png" width={176} height={176} alt="password changed image" />
            <h1 className="pt-8 text-center text-xl font-bold">Password changed</h1>
            <p className="pt-3 text-center text-sm">Your password has been changed successfully.</p>
            <Link
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-12 h-14 w-full rounded-full text-base font-bold",
              )}
              href="/"
            >
              Continue
            </Link>
          </div>
        ) : (
          <>
            {" "}
            <div className="py-3 text-center">
              <h1 className="text-xl font-bold">Reset Password</h1>
              <p className="text-sm">Type a new password. It must contain at least 8 letters.</p>
            </div>
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="New Password" {...field} />
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
              <Button disabled={isLoading.value} className="h-14 w-full rounded-full text-base font-bold" type="submit">
                Change Password
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  )
}
