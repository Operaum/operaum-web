"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { placeholderEvents } from "@/lib/placeholder-events";
import { EventType } from "@/types/event";

const Calendar = dynamic(
  () => import("@/components/ui/calendar").then((mod) => mod.Calendar),
  { ssr: false }
);

const typeStyles: Record<EventType, string> = {
  Showing: "bg-accent text-accent-foreground",
  Call: "bg-secondary text-secondary-foreground",
  Meeting: "bg-primary text-primary-foreground",
  "Open House": "bg-muted text-muted-foreground",
};

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Calendar</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr]">
        <Card className="w-fit">
          <CardContent className="p-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {placeholderEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-md border border-border p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.date} · {event.time}
                    {event.location ? ` · ${event.location}` : ""}
                  </p>
                </div>
                <Badge className={typeStyles[event.type]}>{event.type}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}