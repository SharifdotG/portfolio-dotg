// Lightweight in-memory fixed-window rate limiter.
//
// This has no external dependencies (no Redis/Upstash), so it is per-instance:
// on a multi-instance serverless deployment each instance keeps its own counter.
// That is intentionally "good enough" to blunt casual abuse (spamming the free
// LLM or the contact email) without extra infra. Swap in a shared store later
// if you need strict global limits.

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

// Best-effort periodic cleanup so the map does not grow unbounded.
let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  /** Seconds until the window resets (for Retry-After). */
  retryAfter: number;
};

/**
 * Fixed-window rate limit.
 * @param key    Unique caller identity, e.g. `chat:<ip>`.
 * @param limit  Max requests allowed per window.
 * @param windowMs Window length in milliseconds.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, limit, remaining: limit - 1, retryAfter: 0 };
  }

  if (bucket.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return {
    success: true,
    limit,
    remaining: limit - bucket.count,
    retryAfter: 0,
  };
}

/** Extract the best-guess client IP from proxy headers (Vercel/most hosts). */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}
