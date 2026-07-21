"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
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
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";

const mainNav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/dashboard/leads", icon: Users },
  { label: "Listings", href: "/dashboard/listings", icon: Home },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
];

const agentNav: NavItem[] = [
  { label: "Lead Agent", href: "/dashboard/lead-agent", icon: Bot },
  { label: "Market Research", href: "/dashboard/market-research", icon: Compass },
  { label: "AI Assistant", href: "/dashboard/assistant", icon: Sparkles },
];

const insightsNav: NavItem[] = [
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Reporting", href: "/dashboard/reporting", icon: FileBarChart },
  { label: "Automation", href: "/dashboard/automation", icon: Workflow },
];

const accountNav: NavItem[] = [
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

function NavGroup({ label, items, pathname }: { label: string; items: NavItem[]; pathname: string }) {
  return (
    <div className="space-y-1">
      <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/35">
        {label}
      </p>
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              isActive
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-primary-foreground/65 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-primary text-primary-foreground shadow-[2px_0_12px_rgba(0,0,0,0.15)]">
      <div className="flex h-16 items-center px-6">
        <span className="font-heading text-xl font-bold tracking-tight">Operaum</span>
      </div>
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        <NavGroup label="Workspace" items={mainNav} pathname={pathname} />
        <NavGroup label="AI Agents" items={agentNav} pathname={pathname} />
        <NavGroup label="Insights" items={insightsNav} pathname={pathname} />
        <NavGroup label="Account" items={accountNav} pathname={pathname} />
      </nav>
      <div className="border-t border-primary-foreground/10 px-3 py-4">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary-foreground/65 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </aside>
  );
}
