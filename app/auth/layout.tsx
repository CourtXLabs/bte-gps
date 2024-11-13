export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-2xl gap-12 p-6 pt-20 lg:p-10 xl:gap-28 xl:px-20 xl:py-12">
      {children}
    </main>
  )
}
