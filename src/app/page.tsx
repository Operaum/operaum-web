import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Users, Home, Calendar, TrendingUp } from "lucide-react";
import { LeadCaptureForm } from "@/components/lead-capture-form";

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

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b border-border px-6">
        <span className="text-xl font-bold text-foreground">Operaum</span>
        <div className="flex items-center gap-3">
          <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
            Log in
          </Link>
          <Link href="/dashboard" className={buttonVariants()}>
            Get Started
          </Link>
        </div>
      </header>

      <section className="flex flex-col items-center gap-6 px-6 py-24 text-center">
        <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3 w-3 text-accent" />
          The AI Operating System for Modern Realtors
        </div>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Meet Your AI Co-Agent.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
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
      </section>

      <section id="features" className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title}>
              <CardContent className="space-y-3 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section id="demo" className="mx-auto w-full max-w-xl px-6 pb-24">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-foreground">See the AI Lead Agent in action</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This is a live demo of a buyer inquiry form. Submissions are automatically scored
            and routed by Operaum's AI Lead Agent - just like it would work on your own site.
          </p>
        </div>
        <LeadCaptureForm />
      </section>

      <section className="border-t border-border bg-primary px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-primary-foreground">
          Ready to work smarter?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-primary-foreground/70">
          Join realtors using Operaum to run their entire business from one place.
        </p>
        <Link
          href="/dashboard"
          className={buttonVariants({ size: "lg", className: "mt-6 bg-accent text-accent-foreground hover:bg-accent/90" })}
        >
          Get Started Free
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
