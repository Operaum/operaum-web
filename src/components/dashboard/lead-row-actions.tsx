"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/dashboard/confirm-delete-dialog";
import { EditLeadDialog } from "@/components/dashboard/edit-lead-dialog";

const statusStyles: Record<string, string> = {
  New: "bg-accent text-accent-foreground",
  Contacted: "bg-secondary text-secondary-foreground",
  Qualified: "bg-primary text-primary-foreground",
  Closed: "bg-muted text-muted-foreground",
};

const statuses = ["New", "Contacted", "Qualified", "Closed"];

export function LeadStatusCell({ leadId, status }: { leadId: string; status: string }) {
  const [current, setCurrent] = useState(status);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  async function updateStatus(newStatus: string) {
    setUpdating(true);
    const response = await fetch("/api/leads/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, status: newStatus }),
    });

    if (response.ok) {
      setCurrent(newStatus);
      router.refresh();
    }
    setUpdating(false);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={updating}>
        <Badge className={`${statusStyles[current] ?? statusStyles.New} cursor-pointer`}>
          {current}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {statuses.map((s) => (
          <DropdownMenuItem key={s} onClick={() => updateStatus(s)}>
            {s}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface LeadRowActionsProps {
  leadId: string;
  leadName: string;
  leadEmail: string | null;
  leadPhone: string | null;
  leadSource: string | null;
}

export function LeadRowActions({
  leadId,
  leadName,
  leadEmail,
  leadPhone,
  leadSource,
}: LeadRowActionsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const response = await fetch("/api/leads/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId }),
    });
    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={() => setConfirmOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditLeadDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        leadId={leadId}
        initialName={leadName}
        initialEmail={leadEmail}
        initialPhone={leadPhone}
        initialSource={leadSource}
      />

      <ConfirmDeleteDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleDelete}
        title={`Delete ${leadName}?`}
        description="This lead and its activity history will be permanently removed. This action cannot be undone."
      />
    </>
  );
}
