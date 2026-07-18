import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/auth-schema";
import { authRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { success } = await authRateLimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again in a minute." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { name, email, password, region } = parsed.data;

  const existing = await prisma.users.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
      region,
    },
  });

  await prisma.agent_criteria.create({
    data: {
      user_id: user.id,
      status: "active",
      min_score: 70,
    },
  });

  return NextResponse.json({ id: user.id, email: user.email, name: user.name });
}
