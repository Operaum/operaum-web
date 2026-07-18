import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { listingId, address, city, price, beds, baths, sqft, status } = body;

  if (!listingId || !address || !city || !price) {
    return NextResponse.json({ error: "listingId, address, city, and price are required" }, { status: 400 });
  }

  const listing = await prisma.listings.findUnique({ where: { id: listingId } });
  if (!listing || listing.user_id !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.listings.update({
    where: { id: listingId },
    data: {
      address,
      city,
      price: Number(price),
      beds: beds ? Number(beds) : null,
      baths: baths ? Number(baths) : null,
      sqft: sqft ? Number(sqft) : null,
      status: status || listing.status,
    },
  });

  return NextResponse.json({ success: true });
}
