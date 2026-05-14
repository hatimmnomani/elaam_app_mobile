// Quiz access polling configuration
export const QUIZ_ACCESS_CONFIG = {
  // Polling interval in milliseconds (default: 20 seconds)
  POLL_INTERVAL: 20000,

  // Maximum number of polling attempts (optional, set to null for unlimited)
  MAX_ATTEMPTS: null,

  // Enable/disable polling (useful for development/testing)
  ENABLED: true,

  // Retry delay when polling fails (in milliseconds)
  RETRY_DELAY: 5000,
};
