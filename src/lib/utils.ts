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
