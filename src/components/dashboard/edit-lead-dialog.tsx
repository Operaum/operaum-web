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
} from "@/components/ui/dialog";

interface EditLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leadId: string;
  initialName: string;
  initialEmail: string | null;
  initialPhone: string | null;
  initialSource: string | null;
}

export function EditLeadDialog({
  open,
  onOpenChange,
  leadId,
  initialName,
  initialEmail,
  initialPhone,
  initialSource,
}: EditLeadDialogProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail ?? "");
  const [phone, setPhone] = useState(initialPhone ?? "");
  const [source, setSource] = useState(initialSource ?? "");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const response = await fetch("/api/leads/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, name, email, phone, source }),
    });

    setSaving(false);

    if (response.ok) {
      onOpenChange(false);
      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="edit-lead-name">Full Name</Label>
            <Input id="edit-lead-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="edit-lead-email">Email</Label>
            <Input id="edit-lead-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="edit-lead-phone">Phone</Label>
            <Input id="edit-lead-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="edit-lead-source">Source</Label>
            <Input id="edit-lead-source" value={source} onChange={(e) => setSource(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
