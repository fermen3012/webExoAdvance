"use server";

import { cookies, headers } from "next/headers";
import { checkRateLimit } from "@/lib/security/rate-limiter";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "exo_admin_session";

function getAdminAuthSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PIN || "exo_admin_secure_vault_2026";
  return secret;
}

function computeSessionToken(secret: string): string {
  return crypto.createHmac("sha256", secret).update("exo_admin_authenticated_session_v2").digest("hex");
}

export interface AuthState {
  success: boolean;
  message?: string;
  error?: string;
}

async function getClientIP(): Promise<string> {
  const headerList = await headers();
  const cfConnectingIP = headerList.get("cf-connecting-ip");
  if (cfConnectingIP) return cfConnectingIP.trim();

  const xRealIP = headerList.get("x-real-ip");
  if (xRealIP) return xRealIP.trim();

  const xForwardedFor = headerList.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  return "127.0.0.1";
}

/**
 * Server Action: Validate Admin Passcode with Brute-Force Rate Limiting & Set HttpOnly Signed Cookie
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
    const targetPin = process.env.ADMIN_PIN || "exo2026";

    if (!targetPin) {
      return {
        success: false,
        error: "Admin authentication is not configured on this server.",
      };
    }

    // Timing-safe comparison to prevent timing attacks
    const passcodeBuf = Buffer.from(passcode);
    const targetPinBuf = Buffer.from(targetPin);

    const isMatch =
      passcodeBuf.length === targetPinBuf.length &&
      crypto.timingSafeEqual(passcodeBuf, targetPinBuf);

    if (!isMatch) {
      return {
        success: false,
        error: `Invalid Security Passcode. Remaining attempts: ${rateCheck.remaining}`,
      };
    }

    // Set Secure HttpOnly Signed Cookie
    const authSecret = getAdminAuthSecret();
    const sessionToken = computeSessionToken(authSecret);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
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
 * Server Function: Verify Admin Session Cookie with Cryptographic HMAC
 */
export async function isServerAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie?.value) return false;

    const authSecret = getAdminAuthSecret();
    const expectedToken = computeSessionToken(authSecret);

    const sessionValBuf = Buffer.from(sessionCookie.value);
    const expectedBuf = Buffer.from(expectedToken);

    if (sessionValBuf.length !== expectedBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(sessionValBuf, expectedBuf);
  } catch {
    return false;
  }
}
