import { Card, CardContent } from "@/components/ui/card";
import { AgentWidget } from "@/components/dashboard/agent-widget";
import { MarketResearchWidget } from "@/components/dashboard/market-research-widget";
import { DailyQuote } from "@/components/dashboard/daily-quote";
import { Home, Users, Handshake, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

const metrics = [
  { label: "Active Listings", value: "24", change: "+3 this month", trend: "up" as const, icon: Home },
  { label: "New Leads", value: "13", change: "+5 this week", trend: "up" as const, icon: Users },
  { label: "Deals in Progress", value: "7", change: "-1 this week", trend: "down" as const, icon: Handshake },
  { label: "Revenue (MTD)", value: "$182,400", change: "+12% vs last month", trend: "up" as const, icon: DollarSign },
];

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">{today}</p>
        <h1 className="font-heading text-2xl font-bold text-foreground">Overview</h1>
      </div>

      <DailyQuote />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          const isUp = m.trend === "up";
          const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;
          return (
            <Card
              key={m.label}
              className="border-border/70 shadow-sm transition-shadow hover:shadow-md"
            >
              <CardContent className="pt-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </div>
                <p className="mt-4 text-2xl font-bold text-foreground">{m.value}</p>
                <p className="mt-0.5 text-xs font-medium text-muted-foreground">{m.label}</p>
                <p
                  className={`mt-2 flex items-center gap-1 text-xs font-medium ${
                    isUp ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
                  }`}
                >
                  <TrendIcon className="h-3 w-3" />
                  {m.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div>
        <h2 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Agents
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AgentWidget />
          <MarketResearchWidget />
        </div>
      </div>
    </div>
  );
}
