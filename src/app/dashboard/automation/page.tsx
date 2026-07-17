import { Card, CardContent } from "@/components/ui/card";
import { Workflow } from "lucide-react";

export default function AutomationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Automation</h1>
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Workflow className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Automation Coming Soon</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Set up automatic follow-ups, lead scoring rules, and reminders so nothing falls through the cracks.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
