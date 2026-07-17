export type ListingStatus = "Active" | "Under Contract" | "Closed" | "Off Market";

export interface Listing {
  id: string;
  address: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  status: ListingStatus;
  imageUrl: string;
}