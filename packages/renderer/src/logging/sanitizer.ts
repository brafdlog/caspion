/**
 * Log sanitizer for renderer - removes or masks sensitive information from log messages
 * This is a browser-safe version that doesn't use lookbehind regex (Safari compatibility)
 */

// Regex patterns for sensitive data in strings (browser-safe, no lookbehind)
const SENSITIVE_STRING_PATTERNS: { pattern: RegExp; replacement: string }[] = [
  // Credit card numbers (13-19 digits, possibly with spaces or dashes)
  {
    pattern: /\b(?:\d[ -]*?){13,19}\b/g,
    replacement: '[CARD_REDACTED]',
  },
  // Israeli bank account numbers (typically formatted as XX-XXX-XXXXXX)
  {
    pattern: /\b\d{2}[-/]\d{3}[-/]\d{6,9}\b/g,
    replacement: '[ACCOUNT_REDACTED]',
  },
  // Home directory paths (macOS, Linux, Windows)
  {
    pattern: /\/Users\/[^/\s]+/g,
    replacement: '/Users/[USER_REDACTED]',
  },
  {
    pattern: /\/home\/[^/\s]+/g,
    replacement: '/home/[USER_REDACTED]',
  },
  {
    pattern: /C:\\Users\\[^\\\s]+/gi,
    replacement: 'C:\\Users\\[USER_REDACTED]',
  },
  // Email addresses
  {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    replacement: '[EMAIL_REDACTED]',
  },
];

/**
 * Sanitize a string value by replacing sensitive patterns
 */
export function sanitizeString(value: string): string {
  let result = value;
  for (const { pattern, replacement } of SENSITIVE_STRING_PATTERNS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}
