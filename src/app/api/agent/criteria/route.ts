import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";

export async function POST(request: Request) {
  const body = await request.json();
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await prisma.agent_criteria.upsert({
    where: { user_id: user.id },
    update: {
      status: body.status,
      locations: body.locations,
      min_budget: body.minBudget,
      max_budget: body.maxBudget,
      min_score: body.minScore,
    },
    create: {
      user_id: user.id,
      status: body.status,
      locations: body.locations,
      min_budget: body.minBudget,
      max_budget: body.maxBudget,
      min_score: body.minScore,
    },
  });

  return NextResponse.json({ success: true });
}
