export const dynamic = "force-dynamic";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";
import { AddListingDialog } from "@/components/dashboard/add-listing-dialog";

const statusStyles: Record<string, string> = {
  Active: "bg-accent text-accent-foreground",
  "Under Contract": "bg-secondary text-secondary-foreground",
  Closed: "bg-muted text-muted-foreground",
  "Off Market": "bg-destructive/10 text-destructive",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function ListingsPage() {
  const user = await getCurrentUser();

  const listings = user
    ? await prisma.listings.findMany({
        where: { user_id: user.id },
        orderBy: { created_at: "desc" },
      })
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Listings</h1>
        <AddListingDialog />
      </div>

      {listings.length === 0 && (
        <div className="rounded-lg border border-border bg-card py-16 text-center text-muted-foreground">
          No listings yet. Click &quot;Add Listing&quot; to create your first one.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden py-0">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={listing.image_url ?? `https://picsum.photos/seed/${listing.id}/600/400`}
                alt={listing.address}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              <Badge className={`absolute left-3 top-3 ${statusStyles[listing.status] ?? statusStyles.Active}`}>
                {listing.status}
              </Badge>
            </div>
            <CardContent className="space-y-2 py-4">
              <p className="text-lg font-bold text-foreground">
                {formatPrice(Number(listing.price))}
              </p>
              <p className="text-sm font-medium text-foreground">{listing.address}</p>
              <p className="text-sm text-muted-foreground">{listing.city}</p>
              <div className="flex items-center gap-4 pt-1 text-sm text-muted-foreground">
                {listing.beds != null && (
                  <span className="flex items-center gap-1">
                    <Bed className="h-4 w-4" /> {listing.beds}
                  </span>
                )}
                {listing.baths != null && (
                  <span className="flex items-center gap-1">
                    <Bath className="h-4 w-4" /> {Number(listing.baths)}
                  </span>
                )}
                {listing.sqft != null && (
                  <span className="flex items-center gap-1">
                    <Square className="h-4 w-4" /> {listing.sqft.toLocaleString()} sqft
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
