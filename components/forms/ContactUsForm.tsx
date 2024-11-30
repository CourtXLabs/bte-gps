"use client"

import { submitContactUsForm } from "@/app/(main)/account/settings/actions"
import { userTypes } from "@/constants/contact-us"
import useBoolean from "@/hooks/useBoolean"
import { contactUsFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { useToast } from "../ui/use-toast"

interface Props {
  email?: string | null
  name?: string | null
}

export default function ContactUsForm({ email, name }: Props) {
  const isLoading = useBoolean()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof contactUsFormSchema>>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues: {
      email: email || "",
      name: name || "",
      message: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof contactUsFormSchema>) => {
    isLoading.onTrue()
    const { error } = await submitContactUsForm(values)
    if (error) {
      toast({ variant: "destructive", title: error })
    } else {
      toast({ title: "Thank you for reaching out!" })
      form.reset()
    }
    isLoading.onFalse()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <div className="flex w-full flex-col items-center gap-6 sm:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel className="text-base">Your name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} variant="dark" size="lg" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel className="text-base">Your Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} variant="dark" size="lg" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-base">Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger variant="dark" size="lg" className="border border-input">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {userTypes.map((value) => (
                    <SelectItem value={value} key={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Message</FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder="Type your message" {...field} variant="dark" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size="xl"
          className="w-full bg-white hover:bg-[#dadada] sm:w-52"
          style={{ marginTop: "2rem" }}
          disabled={isLoading.value}
        >
          Send Message
        </Button>
      </form>
    </Form>
  )
}
