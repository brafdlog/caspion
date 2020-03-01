import * as Sentry from '@sentry/electron';
import config from './sentry.config';

// https://github.com/getsentry/sentry-electron/issues/142
const { init } = (process.type === 'browser'
  ? require('@sentry/electron/dist/main')
  : require('@sentry/electron/dist/renderer'));

const reporterConfiguration = {
  ...config,
  defaultIntegrations: false,
};

export function initializeReporter() {
  if (process.env.NODE_ENV === 'production') init(reporterConfiguration);
}

function isSentryInitialized() {
  return !!Sentry.getCurrentHub().getClient();
}

export function ReportProblem(title, body, logs, email, extra) {
  const suffix = isSentryInitialized() ? '' : `-${process.env.NODE_ENV}`;

  const eventId = Sentry.captureEvent({
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

  return eventId + suffix;
}
