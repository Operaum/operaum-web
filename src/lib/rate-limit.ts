import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// 5 requests per 60 seconds per IP - suitable for signup/login/lead capture forms
export const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  prefix: "ratelimit:auth",
});

// 10 requests per 60 seconds per IP - slightly more lenient for lead capture
export const leadRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  prefix: "ratelimit:leads",
});

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}
