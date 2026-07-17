"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Home,
  Calendar,
  Sparkles,
  Bot,
  Compass,
  BarChart3,
  FileBarChart,
  Workflow,
  CreditCard,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";

const navItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/dashboard/leads", icon: Users },
  { label: "Lead Agent", href: "/dashboard/lead-agent", icon: Bot },
  { label: "Market Research", href: "/dashboard/market-research", icon: Compass },
  { label: "Listings", href: "/dashboard/listings", icon: Home },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { label: "AI Assistant", href: "/dashboard/assistant", icon: Sparkles },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Reporting", href: "/dashboard/reporting", icon: FileBarChart },
  { label: "Automation", href: "/dashboard/automation", icon: Workflow },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-primary text-primary-foreground">
      <div className="flex h-16 items-center px-6">
        <span className="text-xl font-bold tracking-tight">Operaum</span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
