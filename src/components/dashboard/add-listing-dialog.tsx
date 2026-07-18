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

export function AddListingDialog() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [sqft, setSqft] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const response = await fetch("/api/listings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address,
        city,
        price: Number(price),
        beds,
        baths,
        sqft,
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(address)}/600/400`,
      }),
    });

    setSaving(false);

    if (response.ok) {
      setOpen(false);
      setAddress("");
      setCity("");
      setPrice("");
      setBeds("");
      setBaths("");
      setSqft("");
      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
  render={
    <Button>
      <Plus className="h-4 w-4" />
      Add Listing
    </Button>
  }
/>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Listing</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="listing-address">Address</Label>
            <Input id="listing-address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="listing-city">City</Label>
            <Input id="listing-city" placeholder="e.g. Langley, BC" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="listing-price">Price</Label>
            <Input id="listing-price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="listing-beds">Beds</Label>
              <Input id="listing-beds" type="number" value={beds} onChange={(e) => setBeds(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="listing-baths">Baths</Label>
              <Input id="listing-baths" type="number" value={baths} onChange={(e) => setBaths(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="listing-sqft">Sqft</Label>
              <Input id="listing-sqft" type="number" value={sqft} onChange={(e) => setSqft(e.target.value)} />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? "Adding..." : "Add Listing"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
