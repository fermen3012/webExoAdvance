import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // 96 bits for GCM

function getMasterKey(): Buffer {
  const secret =
    process.env.POS_TOKEN_ENCRYPTION_KEY ||
    process.env.ADMIN_SESSION_SECRET ||
    "exoadvance-pos-default-secure-vault-key-2026";
  // Derive a 32-byte (256-bit) key using SHA-256
  return crypto.createHash("sha256").update(secret).digest();
}

/**
 * Encrypts sensitive credentials into an AES-256-GCM encrypted string.
 * Output format: "ivHex:authTagHex:ciphertextHex"
 */
export function encryptCredentials(plainText: string): string {
  if (!plainText) return "";
  const key = getMasterKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

/**
 * Decrypts an AES-256-GCM encrypted string back to plaintext.
 * Input format: "ivHex:authTagHex:ciphertextHex"
 */
export function decryptCredentials(encryptedString: string): string {
  if (!encryptedString) return "";
  const parts = encryptedString.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid encrypted credentials format. Expected iv:authTag:ciphertext.");
  }

  const [ivHex, authTagHex, ciphertextHex] = parts;
  const key = getMasterKey();
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(ciphertextHex, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
