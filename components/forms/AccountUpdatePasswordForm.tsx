"use client"

import { updatePassword } from "@/app/(main)/account/settings/actions"
import useBoolean from "@/hooks/useBoolean"
import { updatePasswordFormSchema } from "@/types"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { PasswordInput } from "../ui/password-input"
import { useToast } from "../ui/use-toast"

// TODO: Send email to inform user of password change
export default function AccountUpdatePasswordForm({ email }: { email: string }) {
  const { toast } = useToast()
  const isLoading = useBoolean()
  const form = useForm<z.infer<typeof updatePasswordFormSchema>>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof updatePasswordFormSchema>) => {
    isLoading.onTrue()
    const { error } = await updatePassword({ ...values, email })
    if (error) {
      toast({ variant: "destructive", title: error })
    } else {
      toast({ title: "Password updated" })
      form.reset()
    }
    isLoading.onFalse()
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="border-b border-black text-lg font-bold">Update Password</CardHeader>
          <CardContent className="flex flex-col gap-5 pt-5 lg:flex-row">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Current Password" {...field} variant="dark" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="New Password" {...field} variant="dark" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Confirm Password" {...field} variant="dark" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button size="xl" className="w-40" disabled={isLoading.value}>
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
