import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, ArrowRight } from "lucide-react";

export function MarketResearchWidget() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Market Research Agent
            </p>
            <p className="text-xs text-muted-foreground">
              Fraser Valley avg. price up 3.2% - 19 days on market
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/market-research"
          className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          View Insights <ArrowRight className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}
