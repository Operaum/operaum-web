import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, ArrowRight } from "lucide-react";

export function AgentWidget() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              AI Lead Agent is active
            </p>
            <p className="text-xs text-muted-foreground">
              14 leads added this week - avg score 79
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/lead-agent"
          className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          View Agent <ArrowRight className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}
