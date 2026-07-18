import { z } from "zod";

export const leadCaptureSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.enum(["now", "browsing"]),
  locationsInterest: z.string().min(2, "Tell us where you're looking"),
  message: z.string().optional(),
});

export type LeadCaptureValues = z.infer<typeof leadCaptureSchema>;
