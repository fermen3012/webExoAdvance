interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Server-side IP / Identifier Rate Limiter
 * @param identifier Unique key (e.g. `ip:submit_lead` or `ip:admin_login`)
 * @param maxAttempts Maximum allowed attempts in window
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimit(
  identifier: string,
  maxAttempts: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetInSeconds: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= maxAttempts) {
    const resetInSeconds = Math.ceil((record.resetTime - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.max(resetInSeconds, 1),
    };
  }

  record.count += 1;
  const resetInSeconds = Math.ceil((record.resetTime - now) / 1000);
  return {
    allowed: true,
    remaining: maxAttempts - record.count,
    resetInSeconds,
  };
}

// Cleanup expired records periodically (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}
