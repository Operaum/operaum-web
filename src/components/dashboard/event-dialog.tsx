"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, AlertTriangle } from "lucide-react";
import { timeRangesOverlap } from "@/lib/time-overlap";

const eventTypes = ["Showing", "Call", "Meeting", "Open House"];

interface ExistingEvent {
  id: string;
  title: string;
  event_date: Date;
  event_time: string | null;
  end_time?: string | null;
}

interface EventDialogProps {
  mode: "add" | "edit";
  eventId?: string;
  initialTitle?: string;
  initialDate?: string;
  initialTime?: string;
  initialEndTime?: string;
  initialType?: string;
  initialLocation?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  existingEvents?: ExistingEvent[];
}

export function EventDialog({
  mode,
  eventId,
  initialTitle = "",
  initialDate = "",
  initialTime = "",
  initialEndTime = "",
  initialType = "Showing",
  initialLocation = "",
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  trigger,
  existingEvents = [],
}: EventDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;

  const [title, setTitle] = useState(initialTitle);
  const [eventDate, setEventDate] = useState(initialDate);
  const [eventTime, setEventTime] = useState(initialTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [type, setType] = useState(initialType);
  const [location, setLocation] = useState(initialLocation);
  const [saving, setSaving] = useState(false);
  const [conflict, setConflict] = useState<ExistingEvent | null>(null);
  const router = useRouter();

  function handleOpenChange(next: boolean) {
    if (!next) {
      // Always clear conflict state and reset the form when the dialog
      // closes, for any reason (X button, backdrop click, escape, save),
      // so reopening always starts fresh.
      setConflict(null);
      if (mode === "add") {
        setTitle("");
        setEventDate("");
        setEventTime("");
        setEndTime("");
        setType("Showing");
        setLocation("");
      }
    }
    if (controlledOnOpenChange) {
      controlledOnOpenChange(next);
    } else {
      setInternalOpen(next);
    }
  }

  function findConflict(): ExistingEvent | null {
    // Only check for conflicts if both a start time was actually entered.
    // Without a start time we can't meaningfully compare, so skip the check.
    if (!eventTime.trim()) return null;

    const sameDay = existingEvents.filter((e) => {
      if (mode === "edit" && e.id === eventId) return false;
      const eDate = new Date(e.event_date).toISOString().split("T")[0];
      return eDate === eventDate;
    });

    for (const e of sameDay) {
      if (!e.event_time) continue; // skip comparing against events with no time set
      if (timeRangesOverlap(eventTime, endTime, e.event_time, e.end_time)) {
        return e;
      }
    }

    return null;
  }

  async function saveEvent() {
    setSaving(true);

    const url = mode === "add" ? "/api/calendar/create" : "/api/calendar/update";
    const body =
      mode === "add"
        ? { title, eventDate, eventTime, endTime, type, location }
        : { eventId, title, eventDate, eventTime, endTime, type, location };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);

    if (response.ok) {
      handleOpenChange(false);
      router.refresh();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const foundConflict = findConflict();
    if (foundConflict) {
      setConflict(foundConflict);
      return;
    }
    saveEvent();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger ? (
        <DialogTrigger render={trigger as React.ReactElement} />
      ) : (
        <DialogTrigger
          render={
            <Button>
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          }
        />
      )}
      <DialogContent>
        {conflict ? (
          <>
            <DialogHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <DialogTitle>Time Conflict</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{conflict.title}</span> overlaps
                with this time
                {conflict.event_time
                  ? ` (${conflict.event_time}${conflict.end_time ? ` - ${conflict.end_time}` : ""})`
                  : ""}
                .
              </p>
              <p className="text-sm text-muted-foreground">
                Do you want to schedule this anyway, or go back and pick a different time?
              </p>
            </div>
            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={() => setConflict(null)} disabled={saving}>
                Choose Different Time
              </Button>
              <Button variant="destructive" onClick={saveEvent} disabled={saving}>
                {saving ? "Scheduling..." : "Schedule Anyway"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{mode === "add" ? "Add Event" : "Edit Event"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="event-title">Title</Label>
                <Input id="event-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="event-date">Date</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="event-time">Start Time</Label>
                  <Input
                    id="event-time"
                    placeholder="e.g. 10:00 AM"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="event-end-time">End Time</Label>
                  <Input
                    id="event-end-time"
                    placeholder="e.g. 11:00 AM"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="event-type">Type</Label>
                <select
                  id="event-type"
                  className="flex h-8 w-full rounded-lg border border-border bg-background px-2.5 text-sm"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {eventTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="event-location">Location (optional)</Label>
                <Input id="event-location" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? "Saving..." : mode === "add" ? "Add Event" : "Save Changes"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
