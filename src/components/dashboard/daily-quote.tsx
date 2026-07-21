import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { getTodaysQuote } from "@/lib/daily-quotes";

export function DailyQuote() {
  const quote = getTodaysQuote();
  const [text, author] = quote.split(" - ");

  return (
    <Card className="border-border/70 bg-gradient-to-br from-primary/5 to-accent/5 shadow-sm">
      <CardContent className="flex items-start gap-3 pt-5">
        <Quote className="h-5 w-5 shrink-0 text-accent" />
        <div>
          <p className="text-sm font-medium italic text-foreground">&quot;{text}&quot;</p>
          {author && <p className="mt-1 text-xs text-muted-foreground">- {author}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
