
/**
 * Application configuration
 * Controls global app behavior and feature flags
 */

export const AppConfig = {
  // Set to false when connecting to a real backend API
  useMockData: true,
  
  // API configuration
  api: {
    // Base URL for Spring Boot REST API
    baseUrl: process.env.REACT_APP_API_URL || 'https://api.craftcircle.com/v1',
    timeout: 10000, // 10 seconds
    endpoints: {
      // Auth endpoints
      auth: {
        login: '/auth/login',
        register: '/auth/register',
        resetPassword: '/auth/reset-password',
        refreshToken: '/auth/refresh-token',
      },
      // User endpoints
      users: {
        current: '/users/me',
        profile: (id: string) => `/users/${id}`,
        settings: '/users/me/settings',
        updateProfile: '/users/me',
        updateSettings: '/users/me/settings',
        uploadAvatar: '/users/me/avatar',
      },
      // Tutorial endpoints
      tutorials: {
        list: '/tutorials',
        detail: (id: number) => `/tutorials/${id}`,
        comments: (id: number) => `/tutorials/${id}/comments`,
        create: '/tutorials',
        update: (id: number) => `/tutorials/${id}`,
        delete: (id: number) => `/tutorials/${id}`,
      },
      // Project endpoints
      projects: {
        list: '/projects',
        detail: (id: number) => `/projects/${id}`,
        materials: (id: number) => `/projects/${id}/materials`,
        steps: (id: number) => `/projects/${id}/steps`,
        create: '/projects',
        update: (id: number) => `/projects/${id}`,
        delete: (id: number) => `/projects/${id}`,
      },
      // Subscription endpoints
      subscriptions: {
        current: '/subscriptions/current',
        create: '/subscriptions',
        cancel: '/subscriptions/current',
        paymentMethods: '/payment-methods',
        transactions: '/transactions',
      }
    }
  },
  
  // Feature flags
  features: {
    enableAnalytics: true,
    enableNotifications: true,
    premiumFeatures: true,
  },

  // MongoDB specific settings
  mongodb: {
    // Field mappings from frontend to MongoDB
    fieldMappings: {
      id: '_id', // MongoDB uses _id as primary key
    }
  }
};
