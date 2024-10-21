"use client"

import { upadtePersonalInfo } from "@/app/(main)/account/settings/actions"
import useBoolean from "@/hooks/useBoolean"
import { personalInfoFormSchema } from "@/types"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useToast } from "../ui/use-toast"

interface Props {
  name?: string
}

export default function AccountPersonalInfoForm({ name }: Props) {
  const isLoading = useBoolean()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof personalInfoFormSchema>>({
    defaultValues: {
      name,
    },
  })

  const onSubmit = async (values: z.infer<typeof personalInfoFormSchema>) => {
    isLoading.onTrue()
    const { error } = await upadtePersonalInfo(values)
    if (error) {
      toast({ variant: "destructive", title: error })
    } else {
      toast({ title: "Personal Info updated" })
      form.reset()
    }
    isLoading.onFalse()
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="border-b border-black text-lg font-bold">Update Personal Info</CardHeader>
          <CardContent className="flex flex-col gap-5 pt-5 lg:flex-row">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="lg:w-1/3">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} variant="dark" />
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
