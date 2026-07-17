"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bot, TrendingUp, Zap, UserPlus } from "lucide-react";
import { placeholderAgentActivity } from "@/lib/placeholder-agent-activity";
import { AgentStatus } from "@/types/agent";

const actionStyles: Record<string, string> = {
  added: "bg-accent text-accent-foreground",
  found: "bg-secondary text-secondary-foreground",
  scored: "bg-primary text-primary-foreground",
};

export default function LeadAgentPage() {
  const [status, setStatus] = useState<AgentStatus>("active");
  const [locations, setLocations] = useState("Langley, Surrey, White Rock, Abbotsford");
  const [minBudget, setMinBudget] = useState("400000");
  const [maxBudget, setMaxBudget] = useState("2000000");
  const [minScore, setMinScore] = useState("70");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Lead Generation Agent</h1>
          <p className="text-sm text-muted-foreground">
            Continuously finds, scores, and adds qualified leads to your pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                status === "active" ? "bg-accent" : "bg-muted-foreground"
              }`}
            />
            <span className="text-sm font-medium text-foreground">
              {status === "active" ? "Agent Active" : "Agent Paused"}
            </span>
          </div>
          <Switch
            checked={status === "active"}
            onCheckedChange={(checked) => setStatus(checked ? "active" : "paused")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">14</p>
              <p className="text-xs text-muted-foreground">Leads added this week</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">79</p>
              <p className="text-xs text-muted-foreground">Average lead score</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">238</p>
              <p className="text-xs text-muted-foreground">Signals scanned today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">
              Targeting Criteria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="locations">Target Locations</Label>
              <Input id="locations" value={locations} onChange={(e) => setLocations(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="min-budget">Min Budget</Label>
                <Input id="min-budget" value={minBudget} onChange={(e) => setMinBudget(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="max-budget">Max Budget</Label>
                <Input id="max-budget" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="min-score">Minimum Lead Score to Auto-Add</Label>
              <Input id="min-score" value={minScore} onChange={(e) => setMinScore(e.target.value)} />
            </div>
            <Separator />
            <Button className="w-full">Save Criteria</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
              <Bot className="h-4 w-4 text-accent" />
              Agent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {placeholderAgentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between rounded-md border border-border p-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{activity.leadName}</p>
                    <Badge className={actionStyles[activity.action]}>{activity.action}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{activity.detail}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
                <span className="text-sm font-semibold text-accent">{activity.score}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
