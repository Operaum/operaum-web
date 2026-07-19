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
import { Plus } from "lucide-react";

const eventTypes = ["Showing", "Call", "Meeting", "Open House"];

interface EventDialogProps {
  mode: "add" | "edit";
  eventId?: string;
  initialTitle?: string;
  initialDate?: string;
  initialTime?: string;
  initialType?: string;
  initialLocation?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function EventDialog({
  mode,
  eventId,
  initialTitle = "",
  initialDate = "",
  initialTime = "",
  initialType = "Showing",
  initialLocation = "",
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  trigger,
}: EventDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const onOpenChange = controlledOnOpenChange ?? setInternalOpen;

  const [title, setTitle] = useState(initialTitle);
  const [eventDate, setEventDate] = useState(initialDate);
  const [eventTime, setEventTime] = useState(initialTime);
  const [type, setType] = useState(initialType);
  const [location, setLocation] = useState(initialLocation);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const url = mode === "add" ? "/api/calendar/create" : "/api/calendar/update";
    const body =
      mode === "add"
        ? { title, eventDate, eventTime, type, location }
        : { eventId, title, eventDate, eventTime, type, location };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);

    if (response.ok) {
      onOpenChange(false);
      if (mode === "add") {
        setTitle("");
        setEventDate("");
        setEventTime("");
        setType("Showing");
        setLocation("");
      }
      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add Event" : "Edit Event"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="event-title">Title</Label>
            <Input id="event-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
            <div className="space-y-1">
              <Label htmlFor="event-time">Time</Label>
              <Input
                id="event-time"
                placeholder="e.g. 10:00 AM"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
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
      </DialogContent>
    </Dialog>
  );
}
