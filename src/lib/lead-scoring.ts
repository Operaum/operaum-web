import { LeadCaptureValues } from "@/lib/lead-capture-schema";

export function scoreLeadSubmission(values: LeadCaptureValues): number {
  let score = 40;

  if (values.timeline === "now") {
    score += 25;
  }

  if (values.phone && values.phone.trim().length > 0) {
    score += 10;
  }

  if (values.message && values.message.trim().length > 20) {
    score += 15;
  }

  if (values.budget && values.budget !== "under-400k") {
    score += 10;
  }

  return Math.min(score, 100);
}
