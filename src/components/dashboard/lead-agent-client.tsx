"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bot } from "lucide-react";

interface ActivityRow {
  id: string;
  lead_name: string;
  action: string;
  detail: string | null;
  score: number | null;
  created_at: Date | null;
}

const actionStyles: Record<string, string> = {
  added: "bg-accent text-accent-foreground",
  found: "bg-secondary text-secondary-foreground",
  scored: "bg-primary text-primary-foreground",
};

export function LeadAgentClient({
  initialStatus,
  initialLocations,
  initialMinBudget,
  initialMaxBudget,
  initialMinScore,
  activity,
}: {
  initialStatus: string;
  initialLocations: string;
  initialMinBudget: string;
  initialMaxBudget: string;
  initialMinScore: string;
  activity: ActivityRow[];
}) {
  const [status, setStatus] = useState(initialStatus === "active");
  const [locations, setLocations] = useState(initialLocations);
  const [minBudget, setMinBudget] = useState(initialMinBudget);
  const [maxBudget, setMaxBudget] = useState(initialMaxBudget);
  const [minScore, setMinScore] = useState(initialMinScore);
  const [saving, setSaving] = useState(false);

  async function saveCriteria() {
    setSaving(true);
    await fetch("/api/agent/criteria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: status ? "active" : "paused",
        locations,
        minBudget: Number(minBudget),
        maxBudget: Number(maxBudget),
        minScore: Number(minScore),
      }),
    });
    setSaving(false);
  }

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
            <span className={`h-2 w-2 rounded-full ${status ? "bg-accent" : "bg-muted-foreground"}`} />
            <span className="text-sm font-medium text-foreground">
              {status ? "Agent Active" : "Agent Paused"}
            </span>
          </div>
          <Switch checked={status} onCheckedChange={setStatus} />
        </div>
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
            <Button className="w-full" onClick={saveCriteria} disabled={saving}>
              {saving ? "Saving..." : "Save Criteria"}
            </Button>
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
            {activity.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No activity yet. Submissions from your website will appear here.
              </p>
            )}
            {activity.map((item) => (
              <div key={item.id} className="flex items-start justify-between rounded-md border border-border p-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{item.lead_name}</p>
                    <Badge className={actionStyles[item.action] ?? actionStyles.found}>
                      {item.action}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.created_at?.toLocaleString("en-CA")}
                  </p>
                </div>
                <span className="text-sm font-semibold text-accent">{item.score}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
