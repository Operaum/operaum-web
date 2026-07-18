"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/dashboard/confirm-delete-dialog";
import { EditListingDialog } from "@/components/dashboard/edit-listing-dialog";

interface ListingCardActionsProps {
  listingId: string;
  address: string;
  city: string;
  price: number;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  status: string;
}

export function ListingCardActions({
  listingId,
  address,
  city,
  price,
  beds,
  baths,
  sqft,
  status,
}: ListingCardActionsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
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
      <div className="absolute right-3 top-3 flex gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          className="bg-background/80 text-foreground hover:bg-background"
          onClick={() => setEditOpen(true)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="bg-background/80 text-destructive hover:bg-destructive/10"
          onClick={() => setConfirmOpen(true)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <EditListingDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        listingId={listingId}
        initialAddress={address}
        initialCity={city}
        initialPrice={price}
        initialBeds={beds}
        initialBaths={baths}
        initialSqft={sqft}
        initialStatus={status}
      />

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
