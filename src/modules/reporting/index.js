import * as Sentry from '@sentry/electron';

// https://github.com/getsentry/sentry-electron/issues/142
const { init } = (process.type === 'browser'
  ? require('@sentry/electron/dist/main')
  : require('@sentry/electron/dist/renderer'));


const reporterConfiguration = {
  dsn: SENTRY_DSN,
  defaultIntegrations: false,
  environment: process.env.NODE_ENV,
  enableJavaScript: false,
  enableNative: false,
  enableUnresponsive: false,
};

export function initializeReporter() {
  init(reporterConfiguration);
}

export function ReportProblem(title, body, logs, email, extra) {
  return Sentry.captureEvent({
    message: title,
    logger: logs,
    user: {
      email,
    },
    extra: {
      body,
      ...extra,
    },
  });
}
