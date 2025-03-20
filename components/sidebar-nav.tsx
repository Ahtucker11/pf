"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LayoutDashboard, Users, Settings, LogOut, CreditCard, Building2, User, FileText } from "lucide-react"

export function SidebarNav() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Meetings",
      href: "/meetings",
      icon: Users,
    },
    {
      name: "Stories",
      href: "/stories",
      icon: FileText,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="w-64 bg-[#1a2e29] text-white flex flex-col h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold">ProductForge</h1>
      </div>

      <div className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          {routes.map((route) => {
            const isActive = pathname === route.href || (route.href !== "/dashboard" && pathname.startsWith(route.href))

            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/10",
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 mt-auto border-t border-white/10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full hover:bg-white/10 rounded-md p-2 transition-colors">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium">JD</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-white/60">Product Manager</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Manage Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Building2 className="mr-2 h-4 w-4" />
              <span>Manage Organization</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Manage Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

