"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import {
  Sparkles,
  Users,
  Home,
  Calendar,
  TrendingUp,
  Bot,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Smart Lead Pipeline",
    description: "Track, score, and follow up with leads automatically - never let a hot prospect go cold.",
  },
  {
    icon: Home,
    title: "Listings, Organized",
    description: "Manage every property in one visual dashboard, from active to closed.",
  },
  {
    icon: Calendar,
    title: "Effortless Scheduling",
    description: "Showings, calls, and open houses - all in one calendar that keeps you on track.",
  },
  {
    icon: Sparkles,
    title: "AI That Works For You",
    description: "Ask your assistant anything - from prioritizing your day to drafting follow-ups.",
  },
];

const feedEvents = [
  { name: "Michael Chen", action: "added", detail: "Surrey \u00b7 $700K\u2013$900K", score: 87 },
  { name: "Rachel Osei", action: "found", detail: "Langley \u00b7 3 listings viewed", score: 74 },
  { name: "Nadia Farouk", action: "added", detail: "White Rock \u00b7 $1.5M+", score: 82 },
  { name: "Tom Bellweather", action: "scored", detail: "Re-scored on new activity", score: 91 },
];

const actionColor: Record<string, string> = {
  added: "bg-accent text-accent-foreground",
  found: "bg-secondary text-secondary-foreground",
  scored: "bg-primary text-primary-foreground",
};

function AgentFeed() {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    if (visible >= feedEvents.length) return;
    const timer = setTimeout(() => setVisible((v) => v + 1), 900);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-accent/15 via-transparent to-primary/10 blur-xl" />
      <Card className="relative overflow-hidden border-primary/10 bg-card/95 shadow-xl backdrop-blur">
        <CardContent className="space-y-3 pt-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-semibold text-foreground">Lead Agent</span>
            </div>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Live
            </span>
          </div>
          <div className="space-y-2">
            {feedEvents.slice(0, visible).map((event, i) => (
              <div
                key={event.name}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-background/60 p-2.5 text-left animate-in fade-in slide-in-from-bottom-1"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-foreground">{event.name}</span>
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${actionColor[event.action]}`}>
                      {event.action}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{event.detail}</p>
                </div>
                <span className="text-xs font-semibold text-accent">{event.score}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/70 bg-background/85 px-6 backdrop-blur">
        <span className="font-heading text-xl font-bold text-foreground">Operaum</span>
        <div className="flex items-center gap-3">
          <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
            Log in
          </Link>
          <Link href="/dashboard" className={buttonVariants()}>
            Get Started
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 pb-20 pt-20 sm:pt-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 15% 10%, color-mix(in oklch, var(--accent), transparent 88%), transparent), radial-gradient(50% 40% at 85% 0%, color-mix(in oklch, var(--primary), transparent 92%), transparent)",
          }}
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col items-start gap-6 text-left">
            <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-accent" />
              The AI Operating System for Modern Realtors
            </div>
            <h1 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              Meet Your
              <br />
              AI Co-Agent.
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              Operaum brings your leads, listings, calendar, and AI assistant into one place,
              so you can close more deals with less busywork.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
                Get Started Free
              </Link>
              <Link href="#features" className={buttonVariants({ size: "lg", variant: "outline" })}>
                See Features
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <AgentFeed />
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-border bg-primary px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 max-w-xl">
            <p className="mb-2 font-heading text-sm font-semibold uppercase tracking-wide text-accent">
              Everything in one place
            </p>
            <h2 className="font-heading text-3xl font-bold text-primary-foreground">
              Built for the way realtors actually work
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-xl border border-primary-foreground/10 bg-primary-foreground/[0.06] p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:bg-primary-foreground/10"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent transition-all duration-200 group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-primary-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/65">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="demo" className="border-t border-border px-6 py-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-2 font-heading text-sm font-semibold uppercase tracking-wide text-accent">
              Live demo
            </p>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              See the AI Lead Agent in action
            </h2>
            <p className="mt-3 max-w-sm text-muted-foreground">
              This is a real buyer inquiry form. Submissions are automatically scored and routed by
              Operaum's AI Lead Agent, just like it would work on your own site.
            </p>
          </div>
          <LeadCaptureForm />
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border bg-primary px-6 py-24 text-center">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, color-mix(in oklch, var(--accent), transparent 75%), transparent)",
          }}
        />
        <h2 className="font-heading text-3xl font-bold text-primary-foreground">
          Ready to work smarter?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-primary-foreground/70">
          Join realtors using Operaum to run their entire business from one place.
        </p>
        <Link
          href="/dashboard"
          className={buttonVariants({
            size: "lg",
            className: "mt-6 gap-2 bg-accent text-accent-foreground hover:bg-accent/90",
          })}
        >
          Get Started Free
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>

      <footer className="flex items-center justify-between border-t border-border px-6 py-6 text-sm text-muted-foreground">
        <span>(c) 2026 Operaum. All rights reserved.</span>
        <div className="flex gap-2">
          <TrendingUp className="h-4 w-4" />
        </div>
      </footer>
    </div>
  );
}
