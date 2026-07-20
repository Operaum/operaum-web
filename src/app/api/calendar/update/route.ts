import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { eventId, title, eventDate, eventTime, endTime, type, location } = body;

  if (!eventId || !title || !eventDate || !type) {
    return NextResponse.json({ error: "eventId, title, date, and type are required" }, { status: 400 });
  }

  const event = await prisma.calendar_events.findUnique({ where: { id: eventId } });
  if (!event || event.user_id !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.calendar_events.update({
    where: { id: eventId },
    data: {
      title,
      event_date: new Date(eventDate),
      event_time: eventTime || null,
      end_time: endTime || null,
      type,
      location: location || null,
    },
  });

  return NextResponse.json({ success: true });
}
