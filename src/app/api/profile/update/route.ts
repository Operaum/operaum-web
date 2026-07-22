import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { name, phone, brokerage, avatarColor, instagram, facebook, linkedin, tiktok } = body;

  await prisma.users.update({
    where: { id: user.id },
    data: {
      name: name ?? user.name,
      phone: phone ?? null,
      brokerage: brokerage ?? null,
      avatar_color: avatarColor ?? user.avatar_color,
      instagram: instagram ?? null,
      facebook: facebook ?? null,
      linkedin: linkedin ?? null,
      tiktok: tiktok ?? null,
    },
  });

  return NextResponse.json({ success: true });
}
