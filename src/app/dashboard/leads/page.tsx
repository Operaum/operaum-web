export const dynamic = "force-dynamic";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, UserPlus, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";
import { LeadStatusCell, LeadRowActions } from "@/components/dashboard/lead-row-actions";
import { AddLeadDialog } from "@/components/dashboard/add-lead-dialog";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function LeadsPage() {
  const user = await getCurrentUser();

  const leads = user
    ? await prisma.leads.findMany({
        where: { user_id: user.id },
        orderBy: { created_at: "desc" },
      })
    : [];

  const newCount = leads.filter((l) => l.status === "New").length;
  const qualifiedCount = leads.filter((l) => l.status === "Qualified").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Leads</h1>
          {user?.region && (
            <p className="text-sm text-muted-foreground">Showing leads for {user.region}</p>
          )}
        </div>
        <AddLeadDialog />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border/70">
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{leads.length}</p>
              <p className="text-xs text-muted-foreground">Total leads</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/70">
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <UserPlus className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{newCount}</p>
              <p className="text-xs text-muted-foreground">New this cycle</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/70">
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{qualifiedCount}</p>
              <p className="text-xs text-muted-foreground">Qualified</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={7} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Users className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-foreground">No leads yet</p>
                    <p className="text-xs text-muted-foreground">
                      Submissions from your website will appear here automatically.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {leads.map((lead) => (
              <TableRow key={lead.id} className="group">
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-primary/10 text-[11px] font-semibold text-primary">
                        {initials(lead.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{lead.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                <TableCell className="text-muted-foreground">{lead.phone}</TableCell>
                <TableCell>
                  <LeadStatusCell leadId={lead.id} status={lead.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">{lead.source}</TableCell>
                <TableCell className="text-muted-foreground">
                  {lead.created_at?.toLocaleDateString("en-CA")}
                </TableCell>
                <TableCell>
                  <LeadRowActions
                    leadId={lead.id}
                    leadName={lead.name}
                    leadEmail={lead.email}
                    leadPhone={lead.phone}
                    leadSource={lead.source}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
