"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/dashboard/confirm-delete-dialog";

export function DeleteListingButton({ listingId, address }: { listingId: string; address: string }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const response = await fetch("/api/listings/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId }),
    });
    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute right-3 top-3 bg-background/80 text-destructive hover:bg-destructive/10"
        onClick={() => setConfirmOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <ConfirmDeleteDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleDelete}
        title={`Delete ${address}?`}
        description="This listing will be permanently removed from your dashboard. This action cannot be undone."
      />
    </>
  );
}
