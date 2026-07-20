"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventDialog } from "@/components/dashboard/event-dialog";
import { EventItem } from "@/components/dashboard/event-item";
import { getHolidayForDate, getHolidayDates } from "@/lib/holidays";
import { CalendarDays } from "lucide-react";

const Calendar = dynamic(
  () => import("@/components/ui/calendar").then((mod) => mod.Calendar),
  { ssr: false }
);

interface CalendarEventRow {
  id: string;
  title: string;
  event_date: Date;
  event_time: string | null;
  end_time: string | null;
  type: string;
  location: string | null;
}

function toIsoDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function CalendarClient({ events }: { events: CalendarEventRow[] }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const holidayDates = useMemo(() => getHolidayDates(), []);

  const selectedIso = selectedDate ? toIsoDate(selectedDate) : null;
  const selectedHoliday = selectedDate ? getHolidayForDate(selectedDate) : null;

  const eventsForSelectedDay = events.filter(
    (event) => toIsoDate(new Date(event.event_date)) === selectedIso
  );

  const upcomingEvents = events
    .filter((event) => new Date(event.event_date) >= new Date(new Date().toDateString()))
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
        <EventDialog mode="add" existingEvents={events} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr]">
        <Card className="w-fit">
          <CardContent className="p-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md"
              modifiers={{ holiday: holidayDates }}
              modifiersClassNames={{
                holiday: "bg-accent/20 text-accent font-semibold",
              }}
            />
            <p className="mt-2 flex items-center gap-1.5 px-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-accent/40" />
              Highlighted dates are statutory holidays
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
                <CalendarDays className="h-4 w-4 text-accent" />
                {selectedDate?.toLocaleDateString("en-CA", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedHoliday && (
                <div className="flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 p-3">
                  <Badge className="bg-accent text-accent-foreground">Holiday</Badge>
                  <span className="text-sm font-medium text-foreground">{selectedHoliday.name}</span>
                </div>
              )}
              {eventsForSelectedDay.length === 0 && !selectedHoliday && (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Nothing scheduled for this day.
                </p>
              )}
              {eventsForSelectedDay.map((event) => (
                <EventItem
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={toIsoDate(new Date(event.event_date))}
                  time={event.event_time}
                  endTime={event.end_time}
                  type={event.type}
                  location={event.location}
                  existingEvents={events}
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-foreground">
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No upcoming events. Click &quot;Add Event&quot; to schedule your first one.
                </p>
              )}
              {upcomingEvents.map((event) => (
                <EventItem
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={toIsoDate(new Date(event.event_date))}
                  time={event.event_time}
                  endTime={event.end_time}
                  type={event.type}
                  location={event.location}
                  existingEvents={events}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
