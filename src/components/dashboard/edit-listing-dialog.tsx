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

interface EditListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listingId: string;
  initialAddress: string;
  initialCity: string;
  initialPrice: number;
  initialBeds: number | null;
  initialBaths: number | null;
  initialSqft: number | null;
  initialStatus: string;
}

const statuses = ["Active", "Under Contract", "Closed", "Off Market"];

export function EditListingDialog({
  open,
  onOpenChange,
  listingId,
  initialAddress,
  initialCity,
  initialPrice,
  initialBeds,
  initialBaths,
  initialSqft,
  initialStatus,
}: EditListingDialogProps) {
  const [address, setAddress] = useState(initialAddress);
  const [city, setCity] = useState(initialCity);
  const [price, setPrice] = useState(String(initialPrice));
  const [beds, setBeds] = useState(initialBeds != null ? String(initialBeds) : "");
  const [baths, setBaths] = useState(initialBaths != null ? String(initialBaths) : "");
  const [sqft, setSqft] = useState(initialSqft != null ? String(initialSqft) : "");
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const response = await fetch("/api/listings/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId, address, city, price, beds, baths, sqft, status }),
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
          <DialogTitle>Edit Listing</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="edit-listing-address">Address</Label>
            <Input id="edit-listing-address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="edit-listing-city">City</Label>
            <Input id="edit-listing-city" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="edit-listing-price">Price</Label>
            <Input id="edit-listing-price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="edit-listing-beds">Beds</Label>
              <Input id="edit-listing-beds" type="number" value={beds} onChange={(e) => setBeds(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-listing-baths">Baths</Label>
              <Input id="edit-listing-baths" type="number" value={baths} onChange={(e) => setBaths(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-listing-sqft">Sqft</Label>
              <Input id="edit-listing-sqft" type="number" value={sqft} onChange={(e) => setSqft(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="edit-listing-status">Status</Label>
            <select
              id="edit-listing-status"
              className="flex h-8 w-full rounded-lg border border-border bg-background px-2.5 text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
