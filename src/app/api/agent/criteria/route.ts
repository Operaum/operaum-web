import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const owner = await prisma.users.findFirst({ orderBy: { created_at: "asc" } });
  if (!owner) {
    return NextResponse.json({ error: "No user found" }, { status: 404 });
  }

  await prisma.agent_criteria.upsert({
    where: { user_id: owner.id },
    update: {
      status: body.status,
      locations: body.locations,
      min_budget: body.minBudget,
      max_budget: body.maxBudget,
      min_score: body.minScore,
    },
    create: {
      user_id: owner.id,
      status: body.status,
      locations: body.locations,
      min_budget: body.minBudget,
      max_budget: body.maxBudget,
      min_score: body.minScore,
    },
  });

  return NextResponse.json({ success: true });
}
