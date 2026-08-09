import { NextRequest, NextResponse } from "next/server";

// ──────────────────────────────────────────────
// Allowed Origins List for Oculus AI Production & Local Dev
// ──────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "https://oculus-ai-007.vercel.app", // Exact Production Frontend
  "http://localhost:3000",            // Local Frontend Dev
  "http://localhost:3001",            // Local Backend Dev
];

/**
 * Resolves the Access-Control-Allow-Origin header value dynamically based on request origin.
 */
function getCorsOrigin(requestOrigin: string | null): string {
  if (!requestOrigin) {
    return ALLOWED_ORIGINS[0];
  }

  // Check explicit environment variables
  const envAllowed =
    process.env.ALLOWED_ORIGIN ||
    process.env.FRONTEND_URL ||
    process.env.NEXT_PUBLIC_FRONTEND_URL;

  if (envAllowed && requestOrigin === envAllowed) {
    return requestOrigin;
  }

  // Match production frontend, local dev, or any vercel preview deployment
  if (
    ALLOWED_ORIGINS.includes(requestOrigin) ||
    requestOrigin.endsWith(".vercel.app")
  ) {
    return requestOrigin;
  }

  return ALLOWED_ORIGINS[0];
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const corsOrigin = getCorsOrigin(origin);

  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": corsOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
  };

  // 1. Handle OPTIONS preflight request immediately
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // 2. Handle standard API requests (GET, POST, PUT, PATCH, DELETE)
  const response = NextResponse.next();

  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
