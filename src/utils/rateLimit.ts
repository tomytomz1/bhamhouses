import { NextRequest } from 'next/server';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

interface RateLimitData {
  count: number;
  resetTime: number;
}

// In-memory store (for production, use Redis or similar)
const requestCounts = new Map<string, RateLimitData>();

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of requestCounts.entries()) {
    if (now > data.resetTime) {
      requestCounts.delete(key);
    }
  }
}, 60000); // Clean up every minute

export function rateLimit(config: RateLimitConfig) {
  return function checkRateLimit(request: NextRequest): { 
    allowed: boolean; 
    resetTime: number; 
    remaining: number; 
  } {
    const now = Date.now();
    const key = getClientIdentifier(request);
    
    let rateLimitData = requestCounts.get(key);
    
    // Initialize or reset if window has passed
    if (!rateLimitData || now > rateLimitData.resetTime) {
      rateLimitData = {
        count: 0,
        resetTime: now + config.windowMs,
      };
    }
    
    rateLimitData.count += 1;
    requestCounts.set(key, rateLimitData);
    
    const allowed = rateLimitData.count <= config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - rateLimitData.count);
    
    return {
      allowed,
      resetTime: rateLimitData.resetTime,
      remaining,
    };
  };
}

function getClientIdentifier(request: NextRequest): string {
  // Try to get real IP from headers (considering proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  
  return ip;
}

// Pre-configured rate limiters
export const leadSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 lead submissions per 15 minutes per IP
});

export const addressSearchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30, // 30 address searches per minute per IP
});