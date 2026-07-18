import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { leadId, status } = body;

  if (!leadId || !status) {
    return NextResponse.json({ error: "Missing leadId or status" }, { status: 400 });
  }

  const validStatuses = ["New", "Contacted", "Qualified", "Closed"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await prisma.leads.update({
    where: { id: leadId },
    data: { status },
  });

  return NextResponse.json({ success: true });
}
