"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { leadCaptureSchema, LeadCaptureValues } from "@/lib/lead-capture-schema";

export function LeadCaptureForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadCaptureValues>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: { timeline: "browsing" },
  });

  async function onSubmit(values: LeadCaptureValues) {
    const response = await fetch("/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-lg font-semibold text-foreground">Thanks - we'll be in touch!</p>
        <p className="mt-1 text-sm text-muted-foreground">
          A member of our team will reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-lg border border-border bg-card p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Jane Smith" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" placeholder="(604) 555-0123" {...register("phone")} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="budget">Budget Range</Label>
          <select
            id="budget"
            className="flex h-8 w-full rounded-lg border border-border bg-background px-2.5 text-sm"
            {...register("budget")}
          >
            <option value="">Select a range</option>
            <option value="under-400k">Under $400K</option>
            <option value="400k-700k">$400K - $700K</option>
            <option value="700k-1m">$700K - $1M</option>
            <option value="1m-plus">$1M+</option>
          </select>
          {errors.budget && <p className="text-xs text-destructive">{errors.budget.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="locationsInterest">Areas You're Interested In</Label>
        <Input id="locationsInterest" placeholder="e.g. Langley, White Rock" {...register("locationsInterest")} />
        {errors.locationsInterest && (
          <p className="text-xs text-destructive">{errors.locationsInterest.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Timeline</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="radio" value="now" {...register("timeline")} />
            Looking now
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="radio" value="browsing" {...register("timeline")} />
            Just browsing
          </label>
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="message">Message (optional)</Label>
        <textarea
          id="message"
          rows={3}
          className="flex w-full rounded-lg border border-border bg-background px-2.5 py-2 text-sm"
          placeholder="Tell us what you're looking for..."
          {...register("message")}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Request Info"}
      </Button>
    </form>
  );
}
