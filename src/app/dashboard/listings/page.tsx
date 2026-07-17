import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square } from "lucide-react";
import { placeholderListings } from "@/lib/placeholder-listings";
import { ListingStatus } from "@/types/listing";

const statusStyles: Record<ListingStatus, string> = {
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

export default function ListingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Listings</h1>
        <Button>Add Listing</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderListings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden py-0">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={listing.imageUrl}
                alt={listing.address}
                fill
                className="object-cover"
              />
              <Badge className={`absolute left-3 top-3 ${statusStyles[listing.status]}`}>
                {listing.status}
              </Badge>
            </div>
            <CardContent className="space-y-2 py-4">
              <p className="text-lg font-bold text-foreground">
                {formatPrice(listing.price)}
              </p>
              <p className="text-sm font-medium text-foreground">{listing.address}</p>
              <p className="text-sm text-muted-foreground">{listing.city}</p>
              <div className="flex items-center gap-4 pt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Bed className="h-4 w-4" /> {listing.beds}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="h-4 w-4" /> {listing.baths}
                </span>
                <span className="flex items-center gap-1">
                  <Square className="h-4 w-4" /> {listing.sqft.toLocaleString()} sqft
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}