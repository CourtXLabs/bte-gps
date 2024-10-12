"use client"

import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import useBoolean from "@/hooks/useBoolean"
import { forgotPasswordFormSchema } from "@/types"
import formatApiError from "@/utils/format-api-error"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { forgotPassword } from "./actions"

export default function LoginPage() {
  const { toast } = useToast()
  const isLoading = useBoolean()
  const isSuccess = useBoolean()

  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
    isLoading.onTrue()
    const { error } = await forgotPassword(values)

    if (error) {
      toast({ variant: "destructive", title: formatApiError(error) })
    } else {
      isSuccess.onTrue()
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
        <div className="py-3">
          <Image src="/forgot-password.png" className="mx-auto" alt="Forgot Password" width={172} height={172} />
        </div>
        {isSuccess.value ? (
          <p className="text-center">
            We have sent you instructions to reset your password at {form.getValues("email")}
          </p>
        ) : (
          <>
            {" "}
            <div className="pb-3 text-center">
              <h1 className="text-xl font-bold">Forgot Password</h1>
              <p className="text-sm">
                Don&apos;t worry! It happens. Please enter the email associated with your account.
              </p>
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
            <div className="pt-3">
              <Button disabled={isLoading.value} className="h-14 w-full rounded-full font-bold" type="submit">
                Send Password Reset Email
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  )
}
