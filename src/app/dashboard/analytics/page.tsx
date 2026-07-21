"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Users, Home } from "lucide-react";
import {
  revenueTrend,
  leadsBySource,
  listingsByStatus,
} from "@/lib/placeholder-analytics";

const SOURCE_COLORS = ["#0B1F35", "#C8A15A", "#2F6F4E", "#8B5CF6"];
const STATUS_COLORS = ["#C8A15A", "#0B1F35", "#64748B", "#DC2626"];

export default function AnalyticsPage() {
  const totalLeads = leadsBySource.reduce((sum, s) => sum + s.count, 0);
  const totalListings = listingsByStatus.reduce((sum, s) => sum + s.count, 0);
  const latestRevenue = revenueTrend[revenueTrend.length - 1]?.revenue ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Performance across your pipeline this period</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border/70 shadow-sm">
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">
                {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(latestRevenue)}
              </p>
              <p className="text-xs text-muted-foreground">Revenue this month</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/70 shadow-sm">
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{totalLeads}</p>
              <p className="text-xs text-muted-foreground">Leads tracked</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/70 shadow-sm">
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Home className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{totalListings}</p>
              <p className="text-xs text-muted-foreground">Listings tracked</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/70 shadow-sm">
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="font-heading text-base font-semibold text-foreground">
            Revenue Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="h-56 pt-5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueTrend} margin={{ left: 0, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} axisLine={false} tickLine={false} width={50} />
              <Tooltip
                formatter={(value) =>
                  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(Number(value))
                }
              />
              <Line type="monotone" dataKey="revenue" stroke="#C8A15A" strokeWidth={2} dot={{ r: 3, fill: "#C8A15A" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="font-heading text-base font-semibold text-foreground">
              Leads by Source
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72 pt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadsBySource}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="source" stroke="var(--muted-foreground)" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "var(--muted)" }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {leadsBySource.map((entry, index) => (
                    <Cell key={entry.source} fill={SOURCE_COLORS[index % SOURCE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-sm">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="font-heading text-base font-semibold text-foreground">
              Listings by Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={listingsByStatus}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={80}
                    paddingAngle={2}
                  >
                    {listingsByStatus.map((entry, index) => (
                      <Cell key={entry.status} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border/60 pt-3">
              {listingsByStatus.map((entry, index) => (
                <div key={entry.status} className="flex items-center gap-2 text-xs">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[index % STATUS_COLORS.length] }}
                  />
                  <span className="text-muted-foreground">{entry.status}</span>
                  <span className="ml-auto font-medium text-foreground">{entry.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
