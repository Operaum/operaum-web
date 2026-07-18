import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadCaptureSchema } from "@/lib/lead-capture-schema";
import { scoreLeadSubmission } from "@/lib/lead-scoring";
import { matchRegionFromText } from "@/lib/regions";
import { geocodeRegion } from "@/lib/geocoding";
import { leadRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { success } = await leadRateLimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a minute." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const parsed = leadCaptureSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const values = parsed.data;

  let matchedRegion = await geocodeRegion(values.locationsInterest);
  if (!matchedRegion) {
    matchedRegion = matchRegionFromText(values.locationsInterest);
  }

  const owner = matchedRegion
    ? await prisma.users.findFirst({ where: { region: matchedRegion }, orderBy: { created_at: "asc" } })
    : await prisma.users.findFirst({ orderBy: { created_at: "asc" } });

  const criteria = owner
    ? await prisma.agent_criteria.findUnique({ where: { user_id: owner.id } })
    : null;

  const minScore = criteria?.min_score ?? 70;
  const score = scoreLeadSubmission(values);

  await prisma.agent_activity.create({
    data: {
      user_id: owner?.id ?? null,
      lead_name: values.name,
      action: "found",
      detail: `Submitted inquiry - ${values.locationsInterest}, budget ${values.budget}`,
      score,
    },
  });

  if (score >= minScore) {
    await prisma.leads.create({
      data: {
        user_id: owner?.id ?? null,
        name: values.name,
        email: values.email,
        phone: values.phone ?? null,
        status: "New",
        source: "Website",
      },
    });

    await prisma.agent_activity.create({
      data: {
        user_id: owner?.id ?? null,
        lead_name: values.name,
        action: "added",
        detail: `Matched criteria - auto-added to pipeline (score ${score})`,
        score,
      },
    });
  }

  return NextResponse.json({ success: true, qualified: score >= minScore, score, region: matchedRegion });
}
