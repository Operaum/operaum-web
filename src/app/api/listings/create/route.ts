import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { address, city, price, beds, baths, sqft, status, imageUrl } = body;

  if (!address || !city || !price) {
    return NextResponse.json({ error: "Address, city, and price are required" }, { status: 400 });
  }

  const listing = await prisma.listings.create({
    data: {
      user_id: user.id,
      address,
      city,
      price,
      beds: beds ? Number(beds) : null,
      baths: baths ? Number(baths) : null,
      sqft: sqft ? Number(sqft) : null,
      status: status || "Active",
      image_url: imageUrl || null,
    },
  });

  return NextResponse.json({ success: true, listing });
}
