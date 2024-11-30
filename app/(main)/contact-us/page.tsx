import ContactUsForm from "@/components/forms/ContactUsForm"
import { getUserEmail, getUserFullName } from "@/lib/auth"

export default async function page() {
  const email = await getUserEmail()
  const name = await getUserFullName()

  return (
    <main className="mx-auto mb-20 mt-20 max-w-screen-2xl px-6 lg:mb-24 lg:mt-28">
      <div>
        <h1 className="text-5xl lg:text-6xl">Need help? Get in touch</h1>
        <p className="mt-4 text-lg text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="mt-10 flex flex-col gap-12 lg:mt-20 lg:flex-row lg:items-start 2xl:gap-24">
        <ContactUsForm email={email} name={name} />
        <div className="space-y-14 lg:max-w-xs xl:max-w-none">
          <div className="space-y-5">
            <p className="text-2xl">rashad@beattheexpert.com</p>
            <p className="text-gray-400">Email us directly if you need any help. Our agents will help you.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
