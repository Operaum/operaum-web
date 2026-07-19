"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventDialog } from "@/components/dashboard/event-dialog";
import { EventItem } from "@/components/dashboard/event-item";

const Calendar = dynamic(
  () => import("@/components/ui/calendar").then((mod) => mod.Calendar),
  { ssr: false }
);

interface CalendarEventRow {
  id: string;
  title: string;
  event_date: Date;
  event_time: string | null;
  type: string;
  location: string | null;
}

export function CalendarClient({ events }: { events: CalendarEventRow[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
        <EventDialog mode="add" />
      </div>

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
            {events.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No events yet. Click &quot;Add Event&quot; to schedule your first one.
              </p>
            )}
            {events.map((event) => (
              <EventItem
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.event_date.toISOString().split("T")[0]}
                time={event.event_time}
                type={event.type}
                location={event.location}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
