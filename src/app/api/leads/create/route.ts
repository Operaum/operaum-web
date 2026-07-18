import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { name, email, phone, status, source } = body;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const lead = await prisma.leads.create({
    data: {
      user_id: user.id,
      name,
      email: email || null,
      phone: phone || null,
      status: status || "New",
      source: source || "Manual",
    },
  });

  return NextResponse.json({ success: true, lead });
}
