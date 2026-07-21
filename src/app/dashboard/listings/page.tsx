export const dynamic = "force-dynamic";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, Home, TrendingUp, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";
import { AddListingDialog } from "@/components/dashboard/add-listing-dialog";
import { ListingCardActions } from "@/components/dashboard/listing-card-actions";

const statusStyles: Record<string, string> = {
  Active: "bg-accent text-accent-foreground",
  "Under Contract": "bg-secondary text-secondary-foreground",
  Closed: "bg-muted text-muted-foreground",
  "Off Market": "bg-destructive/10 text-destructive",
};

const ribbonLabels: Record<string, string> = {
  Active: "For Sale",
  "Under Contract": "Pending",
  Closed: "Sold",
  "Off Market": "Off Market",
};

const ribbonStyles: Record<string, string> = {
  Active: "bg-red-600 text-white",
  "Under Contract": "bg-accent text-accent-foreground",
  Closed: "bg-foreground/80 text-background",
  "Off Market": "bg-muted-foreground text-background",
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

  const activeCount = listings.filter((l) => l.status === "Active").length;
  const closedCount = listings.filter((l) => l.status === "Closed").length;
  const totalValue = listings
    .filter((l) => l.status === "Active" || l.status === "Under Contract")
    .reduce((sum, l) => sum + Number(l.price), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-foreground">Listings</h1>
        <AddListingDialog />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border/70">
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Home className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{activeCount}</p>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </div>
          </CardContent>
        </Card>
<Card className="border-border/70">
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{formatPrice(totalValue)}</p>
              <p className="text-xs text-muted-foreground">Active pipeline value</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/70">
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{closedCount}</p>
              <p className="text-xs text-muted-foreground">Closed</p>
            </div>
          </CardContent>
        </Card>
        </div>

      {listings.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-card py-16 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Home className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium text-foreground">No listings yet</p>
          <p className="text-xs text-muted-foreground">
            Click &quot;Add Listing&quot; to create your first one.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <Card
            key={listing.id}
            className="overflow-hidden border-border/70 py-0 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src={listing.image_url ?? `https://picsum.photos/seed/${listing.id}/600/400`}
                alt={listing.address}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
             <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <Badge className={`absolute left-3 top-3 ${statusStyles[listing.status] ?? statusStyles.Active}`}>
                {listing.status}
              </Badge>
              <div className="absolute bottom-3 -right-8 flex w-28 rotate-[-45deg] justify-center">
                <div
                  className={`flex h-5 w-full items-center justify-center text-[9px] font-semibold uppercase leading-none tracking-wide shadow-sm ${
                    ribbonStyles[listing.status] ?? ribbonStyles.Active
                  }`}
                >
                  {ribbonLabels[listing.status] ?? listing.status}
                </div>
              </div>
              <ListingCardActions
                listingId={listing.id}
                address={listing.address}
                city={listing.city}
                price={Number(listing.price)}
                beds={listing.beds}
                baths={listing.baths != null ? Number(listing.baths) : null}
                sqft={listing.sqft}
                status={listing.status}
              />
            </div>
            <CardContent className="space-y-2 py-4">
              <p className="font-heading text-lg font-bold text-foreground">
                {formatPrice(Number(listing.price))}
              </p>
              <p className="text-sm font-medium text-foreground">{listing.address}</p>
              <p className="text-sm text-muted-foreground">{listing.city}</p>
              <div className="flex items-center gap-4 border-t border-border/60 pt-3 text-sm text-muted-foreground">
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
