"use server";

import { cookies, headers } from "next/headers";
import { checkRateLimit } from "@/lib/security/rate-limiter";

const SESSION_COOKIE_NAME = "exo_admin_session";
const DEFAULT_PASSCODE = "exo2026";
// Hash/token for session verification
const SESSION_SECRET_TOKEN = "exo_sec_auth_token_v1_99a8b7c6";

export interface AuthState {
  success: boolean;
  message?: string;
  error?: string;
}

async function getClientIP(): Promise<string> {
  const headerList = await headers();
  const xForwardedFor = headerList.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  return headerList.get("x-real-ip") || "127.0.0.1";
}

/**
 * Server Action: Validate Admin Passcode with Brute-Force Rate Limiting & Set HttpOnly Cookie
 */
export async function adminLoginAction(prevState: AuthState | null, formData: FormData): Promise<AuthState> {
  try {
    const ip = await getClientIP();
    const rateCheck = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000); // 5 attempts per 15 minutes

    if (!rateCheck.allowed) {
      return {
        success: false,
        error: `Too many login attempts. Portal locked for ${rateCheck.resetInSeconds} seconds to prevent brute-force attacks.`,
      };
    }

    const passcode = (formData.get("passcode") as string || "").trim();
    const targetPin = process.env.ADMIN_PIN || process.env.NEXT_PUBLIC_ADMIN_PIN || DEFAULT_PASSCODE;

    if (passcode !== targetPin) {
      return {
        success: false,
        error: `Invalid Security Passcode. Remaining attempts: ${rateCheck.remaining}`,
      };
    }

    // Set Secure HttpOnly Cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, SESSION_SECRET_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return {
      success: true,
      message: "Authentication successful.",
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: "Authentication service error. Please try again.",
    };
  }
}

/**
 * Server Action: Clear HttpOnly Session Cookie
 */
export async function adminLogoutAction(): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
    return { success: true };
  } catch {
    return { success: false };
  }
}

/**
 * Server Function: Verify Admin Session Cookie
 */
export async function isServerAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    return sessionCookie?.value === SESSION_SECRET_TOKEN;
  } catch {
    return false;
  }
}
