"use client"

import { changeEmailAddress } from "@/app/(main)/account/settings/actions"
import useBoolean from "@/hooks/useBoolean"
import { changeEmailAddressFormSchema } from "@/types"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useToast } from "../ui/use-toast"

interface Props {
  email?: string
}

export default function AccountEmailForm({ email }: Props) {
  const isLoading = useBoolean()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof changeEmailAddressFormSchema>>({
    defaultValues: {
      email,
    },
  })

  const onSubmit = async (values: z.infer<typeof changeEmailAddressFormSchema>) => {
    isLoading.onTrue()
    const { error } = await changeEmailAddress(values)
    if (error) {
      toast({ variant: "destructive", title: error })
    } else {
      toast({ title: "Confirmation email sent to your new address. Please verify to complete the change" })
      form.reset()
    }
    isLoading.onFalse()
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="border-b border-black text-lg font-bold">Update Email Address</CardHeader>
          <CardContent className="flex flex-col gap-5 pt-5 lg:flex-row">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="lg:w-1/3">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} variant="dark" />
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
