import type React from "react"
import { SidebarNav } from "@/components/sidebar-nav"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen bg-[#f8f7f4]">
      <SidebarNav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

