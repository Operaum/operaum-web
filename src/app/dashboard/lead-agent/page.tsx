export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { LeadAgentClient } from "@/components/dashboard/lead-agent-client";

export default async function LeadAgentPage() {
  const owner = await prisma.users.findFirst({ orderBy: { created_at: "asc" } });

  const criteria = owner
    ? await prisma.agent_criteria.findUnique({ where: { user_id: owner.id } })
    : null;

  const activity = owner
    ? await prisma.agent_activity.findMany({
        where: { user_id: owner.id },
        orderBy: { created_at: "desc" },
        take: 10,
      })
    : [];

  return (
    <LeadAgentClient
      initialStatus={criteria?.status ?? "active"}
      initialLocations={criteria?.locations ?? ""}
      initialMinBudget={criteria?.min_budget?.toString() ?? "400000"}
      initialMaxBudget={criteria?.max_budget?.toString() ?? "2000000"}
      initialMinScore={criteria?.min_score?.toString() ?? "70"}
      activity={activity}
    />
  );
}
