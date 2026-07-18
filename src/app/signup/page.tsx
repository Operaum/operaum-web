"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { signupSchema, SignupValues } from "@/lib/auth-schema";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({ resolver: zodResolver(signupSchema) });

  async function onSubmit(values: SignupValues) {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: "/dashboard",
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mb-8 text-center">
        <Link href="/" className="text-2xl font-bold text-foreground">
          Operaum
        </Link>
        <p className="mt-2 text-sm text-muted-foreground">Create your account</p>
      </div>

      <Card className="w-full max-w-sm">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Full name</label>
              <Input placeholder="Jane Smith" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input type="email" placeholder="you@example.com" {...register("email")} />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input type="password" placeholder="********" {...register("password")} />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-foreground underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
