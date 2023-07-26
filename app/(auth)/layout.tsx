export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      {children}
    </main>
  )
}
