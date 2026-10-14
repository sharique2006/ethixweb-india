import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

let rateLimiter: Ratelimit | null = null;

function getRateLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  if (!rateLimiter) {
    const redis = new Redis({ url, token });

    rateLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      prefix: "ethixweb:contact",
      analytics: false,
    });
  }

  return rateLimiter;
}

export async function checkRateLimit(identifier: string) {
  const limiter = getRateLimiter();

  if (!limiter) {
    throw new Error("Rate limiting is not configured.");
  }

  return limiter.limit(identifier);
}