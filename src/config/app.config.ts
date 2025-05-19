
/**
 * Application configuration
 * Controls global app behavior and feature flags
 */

export const AppConfig = {
  // Set to false when connecting to a real backend API
  useMockData: true,
  
  // API configuration
  api: {
    baseUrl: 'https://api.craftcircle.com/v1',
    timeout: 10000, // 10 seconds
  },
  
  // Feature flags
  features: {
    enableAnalytics: true,
    enableNotifications: true,
    premiumFeatures: true,
  }
};

