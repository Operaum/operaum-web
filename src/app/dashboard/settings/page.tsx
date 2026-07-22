import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";
import { SettingsClient } from "@/components/dashboard/settings-client";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return <SettingsClient user={user} />;
}
