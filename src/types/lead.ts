export type LeadStatus = "New" | "Contacted" | "Qualified" | "Closed";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
  lastContact: string;
}