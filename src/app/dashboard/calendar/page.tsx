export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";
import { CalendarClient } from "@/components/dashboard/calendar-client";

export default async function CalendarPage() {
  const user = await getCurrentUser();

  const events = user
    ? await prisma.calendar_events.findMany({
        where: { user_id: user.id },
        orderBy: { event_date: "asc" },
      })
    : [];

  return <CalendarClient events={events} />;
}
