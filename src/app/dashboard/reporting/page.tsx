import { Card, CardContent } from "@/components/ui/card";
import { FileBarChart } from "lucide-react";

export default function ReportingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Reporting</h1>
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
            <FileBarChart className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Custom Reports Coming Soon</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Build and export detailed reports on your leads, listings, and revenue. This feature is on our roadmap.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
