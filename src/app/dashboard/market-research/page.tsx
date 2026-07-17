"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, Minus, Compass } from "lucide-react";
import {
  marketTrends,
  comparableProperties,
  marketInsights,
} from "@/lib/placeholder-market-data";
import { MarketInsight } from "@/types/market";

const trendIcon: Record<MarketInsight["trend"], typeof TrendingUp> = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

const trendColor: Record<MarketInsight["trend"], string> = {
  up: "text-accent",
  down: "text-destructive",
  neutral: "text-muted-foreground",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function MarketResearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Market Research Agent</h1>
        <p className="text-sm text-muted-foreground">
          Tracks pricing trends, comparable sales, and market signals across the Fraser Valley.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold text-foreground">{formatPrice(949000)}</p>
            <p className="text-xs text-muted-foreground">Avg. sale price (Jul)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold text-foreground">19 days</p>
            <p className="text-xs text-muted-foreground">Avg. days on market</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold text-foreground">+3.2%</p>
            <p className="text-xs text-muted-foreground">Price change (60 days)</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">
            Fraser Valley Price Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip formatter={(value) => formatPrice(Number(value))} />
              <Line type="monotone" dataKey="avgPrice" stroke="#C8A15A" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">
              Recent Comparable Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Sold Price</TableHead>
                  <TableHead>$/sqft</TableHead>
                  <TableHead>Sold Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparableProperties.map((comp) => (
                  <TableRow key={comp.id}>
                    <TableCell>
                      <p className="font-medium text-foreground">{comp.address}</p>
                      <p className="text-xs text-muted-foreground">{comp.city}</p>
                    </TableCell>
                    <TableCell className="text-foreground">{formatPrice(comp.soldPrice)}</TableCell>
                    <TableCell className="text-muted-foreground">${comp.pricePerSqft}</TableCell>
                    <TableCell className="text-muted-foreground">{comp.soldDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
              <Compass className="h-4 w-4 text-accent" />
              Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {marketInsights.map((insight) => {
              const Icon = trendIcon[insight.trend];
              return (
                <div key={insight.id} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{insight.title}</p>
                    <Icon className={`h-4 w-4 ${trendColor[insight.trend]}`} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{insight.detail}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline">{insight.area}</Badge>
                    <span className="text-xs text-muted-foreground">{insight.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
