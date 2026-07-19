import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { title, eventDate, eventTime, type, location } = body;

  if (!title || !eventDate || !type) {
    return NextResponse.json({ error: "Title, date, and type are required" }, { status: 400 });
  }

  const event = await prisma.calendar_events.create({
    data: {
      user_id: user.id,
      title,
      event_date: new Date(eventDate),
      event_time: eventTime || null,
      type,
      location: location || null,
    },
  });

  return NextResponse.json({ success: true, event });
}
