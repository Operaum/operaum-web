export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";
import { LeadAgentClient } from "@/components/dashboard/lead-agent-client";

export default async function LeadAgentPage() {
  const user = await getCurrentUser();

  const criteria = user
    ? await prisma.agent_criteria.findUnique({ where: { user_id: user.id } })
    : null;

  const activity = user
    ? await prisma.agent_activity.findMany({
        where: { user_id: user.id },
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
