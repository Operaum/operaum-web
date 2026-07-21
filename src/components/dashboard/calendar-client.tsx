"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventDialog } from "@/components/dashboard/event-dialog";
import { EventItem } from "@/components/dashboard/event-item";
import { getHolidayForDate, getHolidayDates, getHolidaysInMonth } from "@/lib/holidays";
import { CalendarDays, Gift, ListChecks } from "lucide-react";

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
  const [viewedMonth, setViewedMonth] = useState<Date>(new Date());
  const holidayDates = useMemo(() => getHolidayDates(), []);
  const monthHolidays = useMemo(
    () => getHolidaysInMonth(viewedMonth.getFullYear(), viewedMonth.getMonth()),
    [viewedMonth]
  );

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
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-sm text-muted-foreground">
            {events.length} event{events.length === 1 ? "" : "s"} scheduled
          </p>
        </div>
        <EventDialog mode="add" existingEvents={events} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr]">
        <Card className="w-fit border-border/70 shadow-sm">
          <CardContent className="p-3">
           <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              onMonthChange={setViewedMonth}
              className="rounded-md"
              modifiers={{ holiday: holidayDates }}
              modifiersClassNames={{
                holiday: "bg-accent/20 text-accent font-semibold",
              }}
            />
            <div className="mt-2 space-y-1 rounded-md bg-accent/5 px-2.5 py-2 text-xs">
              <div className="flex items-center gap-1.5 font-medium text-foreground">
                <Gift className="h-3.5 w-3.5 text-accent" />
                Holidays this month
              </div>
              {monthHolidays.length === 0 ? (
                <p className="pl-5 text-muted-foreground">None</p>
              ) : (
               monthHolidays.map((h) => (
                  <p key={`${h.date}-${h.name}`} className="pl-5 text-muted-foreground">
                    {new Date(h.date + "T00:00:00").toLocaleDateString("en-CA", {
                      month: "short",
                      day: "numeric",
                    })}
                    {" - "}
                    {h.name}
                  </p>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="border-b border-border/60 pb-4">
              <CardTitle className="flex items-center gap-2 font-heading text-base font-semibold text-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <CalendarDays className="h-4 w-4" />
                </span>
                {selectedDate?.toLocaleDateString("en-CA", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {selectedHoliday && (
                <div className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 p-3">
                  <Badge className="bg-accent text-accent-foreground">Holiday</Badge>
                  <span className="text-sm font-medium text-foreground">{selectedHoliday.name}</span>
                </div>
              )}
              {eventsForSelectedDay.length === 0 && !selectedHoliday && (
                <div className="flex flex-col items-center gap-2 py-8 text-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <ListChecks className="h-4.5 w-4.5" />
                  </div>
                  <p className="text-sm text-muted-foreground">Nothing scheduled for this day.</p>
                </div>
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

          <Card className="border-border/70 shadow-sm">
            <CardHeader className="border-b border-border/60 pb-4">
              <CardTitle className="font-heading text-base font-semibold text-foreground">
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
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
