import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Billing</h1>
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
            <CreditCard className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Billing Coming Soon</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Manage your subscription, payment methods, and invoices. This feature is on our roadmap.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
