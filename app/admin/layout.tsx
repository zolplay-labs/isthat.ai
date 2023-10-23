export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-[100dvh] bg-white text-black">{children}</div>
}
