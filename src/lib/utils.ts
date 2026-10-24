import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Detects whether a text snippet is written in Spanish based on diacritics and vocabulary patterns.
 */
export function isSpanishText(text: string): boolean {
  if (!text) return false;
  if (/[áéíóúñü¿¡]/i.test(text)) return true;
  const esKeywords = /\b(hola|buenos|buenas|dias|tardes|noches|gracias|necesito|quiero|me|interesa|para|como|favor|por|sistema|ver|funciona|prueba|tengo|pregunta|cotizacion|precio|costo|servicios|empresa|negocio|restaurante|desarrollo|software|sin|con|este|esta|esto|un|una|el|la|los|las|de|en|y|o|que|cual|saludos|informacion|ayuda|hacer|mas|tambien|somos|donde)\b/i;
  return esKeywords.test(text);
}

/**
 * Extracts only the newly written text from an email reply, stripping out
 * quoted previous message blocks, email client signatures, and header lines.
 */
export function extractCleanEmailReply(text: string): string {
  if (!text) return "";
  const lines = text.split(/\r?\n/);
  const cleanLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Stop at email quote separator headers (English, Spanish, French, etc.)
    if (/^On\s+.+wrote:$/i.test(trimmed)) break;
    if (/^El\s+.+escribi[oó]:$/i.test(trimmed)) break;
    if (/^Le\s+.+a\s+écrit\s*:$/i.test(trimmed)) break;
    if (/^-----Original Message-----/i.test(trimmed)) break;
    if (/^De:\s+.+Enviado el:/i.test(trimmed)) break;
    if (trimmed.startsWith(">")) continue;
    cleanLines.push(line);
  }

  const result = cleanLines.join("\n").trim();
  return result || text.trim();
}
