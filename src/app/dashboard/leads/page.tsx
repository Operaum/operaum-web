export const dynamic = "force-dynamic";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";
import { LeadStatusCell, LeadRowActions } from "@/components/dashboard/lead-row-actions";
import { AddLeadDialog } from "@/components/dashboard/add-lead-dialog";

export default async function LeadsPage() {
  const user = await getCurrentUser();

  const leads = user
    ? await prisma.leads.findMany({
        where: { user_id: user.id },
        orderBy: { created_at: "desc" },
      })
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads</h1>
          {user?.region && (
            <p className="text-sm text-muted-foreground">Showing leads for {user.region}</p>
          )}
        </div>
        <AddLeadDialog />
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
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
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                  No leads yet. Submissions from your website will appear here.
                </TableCell>
              </TableRow>
            )}
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.name}</TableCell>
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
                  <LeadRowActions leadId={lead.id} leadName={lead.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
