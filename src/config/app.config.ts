
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
    baseUrl: import.meta.env.VITE_API_URL || 'https://api.craftcircle.com/v1',
    timeout: 10000, // 10 seconds
    endpoints: {
      // Auth endpoints
      auth: {
        login: '/auth/login',
        register: '/auth/register',
        resetPassword: '/auth/reset-password',
        refreshToken: '/auth/refresh-token',
        logout: '/auth/logout',
      },
      // User endpoints
      users: {
        current: '/users/me',
        profile: (id: string) => `/users/${id}`,
        settings: '/users/me/settings',
        updateProfile: '/users/me',
        updateSettings: '/users/me/settings',
        uploadAvatar: '/users/me/avatar',
        stats: '/users/me/stats',
      },
      // Tutorial endpoints
      tutorials: {
        list: '/tutorials',
        featured: '/tutorials/featured',
        trending: '/tutorials/trending',
        detail: (id: number) => `/tutorials/${id}`,
        comments: (id: number) => `/tutorials/${id}/comments`,
        create: '/tutorials',
        update: (id: number) => `/tutorials/${id}`,
        delete: (id: number) => `/tutorials/${id}`,
        like: (id: number) => `/tutorials/${id}/like`,
        unlike: (id: number) => `/tutorials/${id}/unlike`,
        rate: (id: number) => `/tutorials/${id}/rate`,
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
        share: (id: number) => `/projects/${id}/share`,
      },
      // Subscription endpoints
      subscriptions: {
        current: '/subscriptions/current',
        create: '/subscriptions',
        cancel: '/subscriptions/cancel',
        paymentMethods: '/payment-methods',
        addPaymentMethod: '/payment-methods',
        removePaymentMethod: (id: string) => `/payment-methods/${id}`,
        transactions: '/transactions',
      },
      // Community endpoints
      community: {
        posts: '/community/posts',
        post: (id: string) => `/community/posts/${id}`,
        comments: (id: string) => `/community/posts/${id}/comments`,
        like: (id: string) => `/community/posts/${id}/like`,
        unlike: (id: string) => `/community/posts/${id}/unlike`,
      },
      // Creator analytics endpoints
      analytics: {
        overview: '/analytics/overview',
        tutorials: '/analytics/tutorials',
        revenue: '/analytics/revenue',
        audience: '/analytics/audience',
        feedback: '/analytics/feedback',
      },
      // Partner dashboard endpoints
      partners: {
        stats: '/partners/stats',
        products: '/partners/products',
        orders: '/partners/orders',
        analytics: '/partners/analytics',
      },
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
