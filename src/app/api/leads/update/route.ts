import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { leadId, name, email, phone, source } = body;

  if (!leadId || !name) {
    return NextResponse.json({ error: "leadId and name are required" }, { status: 400 });
  }

  const lead = await prisma.leads.findUnique({ where: { id: leadId } });
  if (!lead || lead.user_id !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.leads.update({
    where: { id: leadId },
    data: {
      name,
      email: email || null,
      phone: phone || null,
      source: source || null,
    },
  });

  return NextResponse.json({ success: true });
}
