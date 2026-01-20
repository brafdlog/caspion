/**
 * Log sanitizer - removes or masks sensitive information from log messages
 *
 * Sensitive data includes:
 * - Account numbers (Israeli bank accounts, typically 6-9 digits)
 * - Credit card numbers (13-19 digits)
 * - Credentials, passwords, tokens
 * - YNAB account mappings
 * - Google Sheets OAuth credentials
 * - File paths containing usernames
 */

// Patterns that indicate sensitive keys in objects
const SENSITIVE_KEY_PATTERNS = [
  /password/i,
  /credential/i,
  /token/i,
  /secret/i,
  /apikey/i,
  /api[_-]?key/i,
  /loginfields/i,
  /login[_-]?fields/i,
  /accesstoken/i,
  /access[_-]?token/i,
  /refreshtoken/i,
  /refresh[_-]?token/i,
  /accountnumber/i,
  /account[_-]?number/i,
  /cardnumber/i,
  /card[_-]?number/i,
  /accountnumberstoynab/i,
  /ynabaccountids/i,
  /client[_-]?id/i,
  /client[_-]?secret/i,
  /auth/i,
  /private[_-]?key/i,
];

// Regex patterns for sensitive data in strings
const SENSITIVE_STRING_PATTERNS: { pattern: RegExp; replacement: string; name: string }[] = [
  // Credit card numbers (13-19 digits, possibly with spaces or dashes)
  {
    pattern: /\b(?:\d[ -]*?){13,19}\b/g,
    replacement: '[CARD_REDACTED]',
    name: 'credit_card',
  },
  // Israeli bank account numbers (typically 6-9 digits after bank/branch)
  // Match patterns like "12-345-678901" or "12-345-67890123"
  {
    pattern: /\b\d{2}[-/]\d{3}[-/]\d{6,9}\b/g,
    replacement: '[ACCOUNT_REDACTED]',
    name: 'bank_account_formatted',
  },
  // Standalone account numbers (6-12 digit numbers that could be accounts)
  // We're conservative here to avoid redacting normal numbers like transaction counts
  {
    pattern: /(?<=accountNumber['":\s=]+)['"]?\d{4,12}['"]?/gi,
    replacement: '[ACCOUNT_REDACTED]',
    name: 'account_number_field',
  },
  // OAuth tokens (long alphanumeric strings)
  {
    pattern: /(?<=token['":\s=]+)['"]?[A-Za-z0-9_-]{20,}['"]?/gi,
    replacement: '[TOKEN_REDACTED]',
    name: 'oauth_token',
  },
  // API keys (common formats)
  {
    pattern: /(?<=(?:api[_-]?key|apikey)['":\s=]+)['"]?[A-Za-z0-9_-]{16,}['"]?/gi,
    replacement: '[API_KEY_REDACTED]',
    name: 'api_key',
  },
  // Home directory paths (macOS, Linux, Windows)
  {
    pattern: /\/Users\/[^/\s]+/g,
    replacement: '/Users/[USER_REDACTED]',
    name: 'macos_path',
  },
  {
    pattern: /\/home\/[^/\s]+/g,
    replacement: '/home/[USER_REDACTED]',
    name: 'linux_path',
  },
  {
    pattern: /C:\\Users\\[^\\\s]+/gi,
    replacement: 'C:\\Users\\[USER_REDACTED]',
    name: 'windows_path',
  },
  // Email addresses
  {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    replacement: '[EMAIL_REDACTED]',
    name: 'email',
  },
];

/**
 * Check if a key name indicates sensitive data
 */
function isSensitiveKey(key: string): boolean {
  return SENSITIVE_KEY_PATTERNS.some((pattern) => pattern.test(key));
}

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

/**
 * Recursively sanitize an object, redacting sensitive keys and values
 */
export function sanitizeObject(obj: unknown, depth = 0): unknown {
  // Prevent infinite recursion
  if (depth > 10) {
    return '[MAX_DEPTH_REACHED]';
  }

  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }

  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item, depth + 1));
  }

  if (typeof obj === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (isSensitiveKey(key)) {
        // Redact the entire value for sensitive keys
        if (typeof value === 'object' && value !== null) {
          sanitized[key] = '[REDACTED_OBJECT]';
        } else if (typeof value === 'string' && value.length > 0) {
          // Show first char and length for debugging
          sanitized[key] = `[REDACTED:${value.length}chars]`;
        } else {
          sanitized[key] = '[REDACTED]';
        }
      } else {
        sanitized[key] = sanitizeObject(value, depth + 1);
      }
    }
    return sanitized;
  }

  return obj;
}

/**
 * Sanitize details object for logging
 * This is the main entry point for sanitizing log data
 */
export function sanitizeLogDetails(details: Record<string, unknown>): Record<string, unknown> {
  return sanitizeObject(details) as Record<string, unknown>;
}

/**
 * Sanitize a log message string
 */
export function sanitizeLogMessage(message: string): string {
  return sanitizeString(message);
}

/**
 * Create a safe representation of credentials for logging
 * Shows which fields are present without revealing values
 */
export function describeCredentials(credentials: Record<string, unknown> | undefined): string {
  if (!credentials) return 'none';
  const fields = Object.keys(credentials);
  return `[${fields.length} fields: ${fields.join(', ')}]`;
}

/**
 * Create a safe representation of an account number for logging
 * Shows last 4 digits only
 */
export function maskAccountNumber(accountNumber: string | undefined): string {
  if (!accountNumber) return 'N/A';
  if (accountNumber.length <= 4) return '[REDACTED]';
  return `****${accountNumber.slice(-4)}`;
}

/**
 * Create a safe representation of multiple account numbers
 */
export function maskAccountNumbers(accountNumbers: string[]): string {
  if (!accountNumbers || accountNumbers.length === 0) return 'none';
  return accountNumbers.map(maskAccountNumber).join(', ');
}
