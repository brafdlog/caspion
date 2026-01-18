import { describe, expect, it } from 'vitest';
import {
  describeCredentials,
  maskAccountNumber,
  maskAccountNumbers,
  sanitizeLogDetails,
  sanitizeLogMessage,
  sanitizeObject,
  sanitizeString,
} from './sanitizer';

describe('sanitizer', () => {
  describe('sanitizeString', () => {
    it('should redact credit card numbers', () => {
      expect(sanitizeString('Card: 4111111111111111')).toBe('Card: [CARD_REDACTED]');
      expect(sanitizeString('Card: 4111 1111 1111 1111')).toBe('Card: [CARD_REDACTED]');
      expect(sanitizeString('Card: 4111-1111-1111-1111')).toBe('Card: [CARD_REDACTED]');
    });

    it('should redact Israeli bank account numbers', () => {
      expect(sanitizeString('Account: 12-345-678901')).toBe('Account: [ACCOUNT_REDACTED]');
      expect(sanitizeString('Account: 12/345/678901')).toBe('Account: [ACCOUNT_REDACTED]');
    });

    it('should redact macOS home paths', () => {
      expect(sanitizeString('/Users/jonathan/code/project')).toBe('/Users/[USER_REDACTED]/code/project');
    });

    it('should redact Linux home paths', () => {
      expect(sanitizeString('/home/ubuntu/app')).toBe('/home/[USER_REDACTED]/app');
    });

    it('should redact Windows paths', () => {
      expect(sanitizeString('C:\\Users\\JohnDoe\\Documents')).toBe('C:\\Users\\[USER_REDACTED]\\Documents');
    });

    it('should redact email addresses', () => {
      expect(sanitizeString('Contact: john@example.com')).toBe('Contact: [EMAIL_REDACTED]');
    });

    it('should handle multiple sensitive items in one string', () => {
      const input = 'User /Users/john logged in with email test@test.com';
      const result = sanitizeString(input);
      expect(result).toBe('User /Users/[USER_REDACTED] logged in with email [EMAIL_REDACTED]');
    });

    it('should not modify non-sensitive strings', () => {
      expect(sanitizeString('Hello world')).toBe('Hello world');
      expect(sanitizeString('Transaction count: 42')).toBe('Transaction count: 42');
    });
  });

  describe('sanitizeObject', () => {
    it('should redact sensitive keys', () => {
      const input = {
        username: 'john',
        password: 'secret123',
        token: 'abc123xyz',
      };
      const result = sanitizeObject(input) as Record<string, unknown>;
      expect(result.username).toBe('john');
      expect(result.password).toBe('[REDACTED:9chars]');
      expect(result.token).toBe('[REDACTED:9chars]');
    });

    it('should redact loginFields', () => {
      const input = {
        name: 'Bank Account',
        loginFields: { username: 'user', password: 'pass' },
      };
      const result = sanitizeObject(input) as Record<string, unknown>;
      expect(result.name).toBe('Bank Account');
      expect(result.loginFields).toBe('[REDACTED_OBJECT]');
    });

    it('should redact accountNumber fields', () => {
      const input = {
        accountNumber: '123456789',
        name: 'Checking',
      };
      const result = sanitizeObject(input) as Record<string, unknown>;
      expect(result.accountNumber).toBe('[REDACTED:9chars]');
      expect(result.name).toBe('Checking');
    });

    it('should sanitize strings in nested objects', () => {
      const input = {
        config: {
          path: '/Users/john/config.json',
        },
      };
      const result = sanitizeObject(input) as { config: { path: string } };
      expect(result.config.path).toBe('/Users/[USER_REDACTED]/config.json');
    });

    it('should handle arrays', () => {
      const input = {
        emails: ['test@test.com', 'user@example.com'],
      };
      const result = sanitizeObject(input) as { emails: string[] };
      expect(result.emails).toEqual(['[EMAIL_REDACTED]', '[EMAIL_REDACTED]']);
    });

    it('should handle null and undefined', () => {
      expect(sanitizeObject(null)).toBe(null);
      expect(sanitizeObject(undefined)).toBe(undefined);
    });

    it('should handle primitive types', () => {
      expect(sanitizeObject(42)).toBe(42);
      expect(sanitizeObject(true)).toBe(true);
    });

    it('should prevent infinite recursion', () => {
      const input: Record<string, unknown> = { level: 0 };
      let current = input;
      for (let i = 1; i <= 15; i++) {
        current.nested = { level: i };
        current = current.nested as Record<string, unknown>;
      }
      // Should not throw and should have max depth marker
      const result = sanitizeObject(input);
      expect(result).toBeDefined();
    });
  });

  describe('sanitizeLogDetails', () => {
    it('should sanitize a typical log details object', () => {
      const input = {
        operation: 'export',
        exporter: 'ynab',
        accountNumbersToYnabAccountIds: { '12345': 'abc' },
        path: '/Users/jonathan/exports',
      };
      const result = sanitizeLogDetails(input);
      expect(result.operation).toBe('export');
      expect(result.exporter).toBe('ynab');
      expect(result.accountNumbersToYnabAccountIds).toBe('[REDACTED_OBJECT]');
      expect(result.path).toBe('/Users/[USER_REDACTED]/exports');
    });
  });

  describe('sanitizeLogMessage', () => {
    it('should sanitize a full log message', () => {
      const message = 'Processing account 12-345-678901 for user@bank.com at /Users/john/data';
      const result = sanitizeLogMessage(message);
      expect(result).toBe('Processing account [ACCOUNT_REDACTED] for [EMAIL_REDACTED] at /Users/[USER_REDACTED]/data');
    });
  });

  describe('describeCredentials', () => {
    it('should describe credentials without revealing values', () => {
      const creds = { username: 'john', password: 'secret', id: '12345' };
      const result = describeCredentials(creds);
      expect(result).toBe('[3 fields: username, password, id]');
    });

    it('should handle undefined credentials', () => {
      expect(describeCredentials(undefined)).toBe('none');
    });

    it('should handle empty credentials', () => {
      expect(describeCredentials({})).toBe('[0 fields: ]');
    });
  });

  describe('maskAccountNumber', () => {
    it('should show only last 4 digits', () => {
      expect(maskAccountNumber('123456789')).toBe('****6789');
    });

    it('should handle short account numbers', () => {
      expect(maskAccountNumber('123')).toBe('[REDACTED]');
      expect(maskAccountNumber('1234')).toBe('[REDACTED]');
    });

    it('should handle undefined', () => {
      expect(maskAccountNumber(undefined)).toBe('N/A');
    });
  });

  describe('maskAccountNumbers', () => {
    it('should mask multiple account numbers', () => {
      expect(maskAccountNumbers(['123456789', '987654321'])).toBe('****6789, ****4321');
    });

    it('should handle empty array', () => {
      expect(maskAccountNumbers([])).toBe('none');
    });
  });
});
