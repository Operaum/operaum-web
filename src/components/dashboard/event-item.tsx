"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { EventDialog } from "@/components/dashboard/event-dialog";
import { ConfirmDeleteDialog } from "@/components/dashboard/confirm-delete-dialog";

interface EventItemProps {
  id: string;
  title: string;
  date: string;
  time: string | null;
  type: string;
  location: string | null;
}

const typeStyles: Record<string, string> = {
  Showing: "bg-accent text-accent-foreground",
  Call: "bg-secondary text-secondary-foreground",
  Meeting: "bg-primary text-primary-foreground",
  "Open House": "bg-muted text-muted-foreground",
};

export function EventItem({ id, title, date, time, type, location }: EventItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const response = await fetch("/api/calendar/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId: id }),
    });
    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <div className="flex items-center justify-between rounded-md border border-border p-3">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">
          {date} {time ? `\u00b7 ${time}` : ""} {location ? `\u00b7 ${location}` : ""}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Badge className={typeStyles[type] ?? typeStyles.Showing}>{type}</Badge>
        <Button variant="ghost" size="icon-sm" onClick={() => setEditOpen(true)}>
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-destructive hover:bg-destructive/10"
          onClick={() => setConfirmOpen(true)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <EventDialog
        mode="edit"
        eventId={id}
        initialTitle={title}
        initialDate={date}
        initialTime={time ?? ""}
        initialType={type}
        initialLocation={location ?? ""}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <ConfirmDeleteDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleDelete}
        title={`Delete "${title}"?`}
        description="This event will be permanently removed from your calendar."
      />
    </div>
  );
}
