module.exports = {
  SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN),
  // https://console.developers.google.com/apis/credentials
  GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID),
  GOOGLE_CLIENT_SECRET: JSON.stringify(process.env.GOOGLE_CLIENT_SECRET),
  SOURCE_COMMIT_SHORT: JSON.stringify(process.env.GITHUB_SHA)
};
