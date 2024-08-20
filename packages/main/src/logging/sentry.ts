import { init, captureMessage, type ElectronMainOptions } from '@sentry/electron/main';

const reporterConfiguration = {
  dsn: import.meta.env.SENTRY_DSN,
  defaultIntegrations: false,
  environment: process.env.NODE_ENV,
  enableJavaScript: true,
  enableNative: false,
  enableUnresponsive: false,
} as ElectronMainOptions;

const initializeReporter = () => init(reporterConfiguration);

const userReportProblem = (title: string, body: string, logs: string, email: string, extra: Record<string, unknown>) => {
  return captureMessage(title, {
    user: {
      email,
    },
    extra: {
      body,
      logs,
      ...extra,
    },
  });
};

export default {
  initializeReporter,
  userReportProblem,
};
