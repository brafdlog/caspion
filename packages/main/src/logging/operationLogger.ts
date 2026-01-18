import { v4 as uuidv4 } from 'uuid';
import { type Logger } from './logger';
import { sanitizeLogDetails, sanitizeLogMessage } from './sanitizer';

// Lazy-load logger to avoid issues in test environments
let loggerInstance: Logger | null = null;

function getLogger(): Logger {
  if (!loggerInstance) {
    try {
      // Dynamic import to allow tests to mock before loading
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      loggerInstance = require('./logger').default;
    } catch {
      // Fallback for test environments where electron isn't available
      loggerInstance = {
        info: console.log,
        warn: console.warn,
        error: console.error,
      } as Logger;
    }
  }
  return loggerInstance!;
}

export type OperationType = 'scrape' | 'export' | 'app';

export interface OperationContext {
  operationId: string;
  startTime: number;
  type: OperationType;
}

export interface OperationLogger {
  context: OperationContext;
  info: (phase: string, details?: Record<string, unknown>) => void;
  warn: (phase: string, details?: Record<string, unknown>) => void;
  error: (phase: string, error: Error, details?: Record<string, unknown>) => void;
  summary: (result: 'success' | 'partial' | 'failed', stats: Record<string, number | string>) => void;
}

/**
 * Creates a structured operation logger with a unique operation ID for tracing.
 * Outputs human-readable logs in the format:
 * [HH:MM:SS] [opId] PHASE | key=value key2=value2
 */
export function createOperationLogger(type: OperationType): OperationLogger {
  const context: OperationContext = {
    operationId: uuidv4().substring(0, 8),
    startTime: Date.now(),
    type,
  };

  const formatDetails = (details: Record<string, unknown> = {}): string => {
    // Sanitize all details before logging
    const sanitized = sanitizeLogDetails(details);
    const pairs = Object.entries(sanitized)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => {
        if (typeof value === 'object') {
          return `${key}=${JSON.stringify(value)}`;
        }
        return `${key}=${value}`;
      });
    return pairs.length > 0 ? ` | ${pairs.join(' ')}` : '';
  };

  const getElapsed = (): string => {
    const elapsed = Date.now() - context.startTime;
    if (elapsed < 1000) return `${elapsed}ms`;
    return `${(elapsed / 1000).toFixed(1)}s`;
  };

  const truncateStack = (stack?: string, maxLines = 5): string | undefined => {
    if (!stack) return undefined;
    const lines = stack.split('\n');
    const truncated = lines.slice(0, maxLines + 1); // +1 for the error message line
    if (lines.length > maxLines + 1) {
      truncated.push(`    ... ${lines.length - maxLines - 1} more lines`);
    }
    // Sanitize the stack trace to remove file paths with usernames
    return sanitizeLogMessage(truncated.join('\n'));
  };

  const formatMessage = (phase: string, details: Record<string, unknown> = {}): string => {
    return `[${context.operationId}] ${context.type.toUpperCase()}_${phase}${formatDetails({ ...details, elapsed: getElapsed() })}`;
  };

  return {
    context,

    info(phase: string, details: Record<string, unknown> = {}) {
      getLogger().info(formatMessage(phase, details));
    },

    warn(phase: string, details: Record<string, unknown> = {}) {
      getLogger().warn(formatMessage(phase, details));
    },

    error(phase: string, error: Error, details: Record<string, unknown> = {}) {
      const truncatedStack = truncateStack(error.stack);
      getLogger().error(
        formatMessage(phase, {
          ...details,
          errorName: error.name,
          errorMessage: error.message,
        }),
      );
      // Log stack trace separately for readability
      if (truncatedStack) {
        getLogger().error(`[${context.operationId}] STACK_TRACE:\n${truncatedStack}`);
      }
    },

    summary(result: 'success' | 'partial' | 'failed', stats: Record<string, number | string>) {
      const totalTime = Date.now() - context.startTime;
      const level = result === 'failed' ? 'error' : result === 'partial' ? 'warn' : 'info';
      getLogger()[level](
        `[${context.operationId}] ${context.type.toUpperCase()}_SUMMARY | result=${result} totalTime=${totalTime}ms${formatDetails(stats)}`,
      );
    },
  };
}

/**
 * Log an app-level event (startup, config changes, etc.)
 * These don't need operation IDs since they're standalone events.
 * All details are automatically sanitized to remove sensitive information.
 */
export function logAppEvent(event: string, details: Record<string, unknown> = {}) {
  const formatDetails = (d: Record<string, unknown>): string => {
    // Sanitize all details before logging
    const sanitized = sanitizeLogDetails(d);
    const pairs = Object.entries(sanitized)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => {
        if (typeof value === 'object') {
          return `${key}=${JSON.stringify(value)}`;
        }
        return `${key}=${value}`;
      });
    return pairs.length > 0 ? ` | ${pairs.join(' ')}` : '';
  };

  getLogger().info(`[app] ${event}${formatDetails(details)}`);
}

// Re-export sanitization helpers for use in application code
export { describeCredentials, maskAccountNumber, maskAccountNumbers } from './sanitizer';
