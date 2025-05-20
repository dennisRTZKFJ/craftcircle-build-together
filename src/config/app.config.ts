
/**
 * Application Configuration
 * 
 * This file contains global configuration settings for the CraftCircle application.
 * It centralizes API endpoints, feature flags, and other configuration options.
 * 
 * When connecting to a production backend:
 * 1. Set useMockData to false
 * 2. Update baseUrl to point to your production API endpoint
 * 3. Review and confirm all endpoint paths match your backend implementation
 */

export const AppConfig = {
  /**
   * Mock Data Toggle
   * 
   * Controls whether the application uses mock data or connects to a real API
   * - true: Uses mock data for development and testing
   * - false: Connects to real API endpoints defined below
   * 
   * IMPORTANT: Set to false for production deployments
   */
  useMockData: true,
  
  /**
   * API Configuration
   * 
   * Contains all settings related to API connectivity, including:
   * - Base URL for the Spring Boot API
   * - Request timeout settings
   * - Centralized endpoint definitions for all API calls
   */
  api: {
    /**
     * API Base URL
     * 
     * Uses environment variable if available, otherwise fallback to default URL
     * 
     * For development: http://localhost:8080/api
     * For production: https://api.craftcircle.com/v1
     */
    baseUrl: import.meta.env.VITE_API_URL || 'https://api.craftcircle.com/v1',
    
    /**
     * Request Timeout (in milliseconds)
     * 
     * Maximum time to wait for API responses before timing out
     */
    timeout: 10000, // 10 seconds
    
    /**
     * API Endpoints
     * 
     * Centralized definition of all API endpoints used by the application
     * Organized by feature area for easy navigation
     * 
     * When implementing backend:
     * - Match these endpoint paths in your Spring Boot controllers
     * - Ensure proper request/response formats
     * - Implement appropriate security/authorization
     */
    endpoints: {
      // Authentication endpoints
      auth: {
        /**
         * User login endpoint
         * 
         * Expected request:
         * {
         *   email: string;
         *   password: string;
         * }
         * 
         * Expected response:
         * {
         *   user: { id: string, name: string, email: string, role: string, ... };
         *   token: string;      // JWT access token
         *   refreshToken?: string; // Optional refresh token
         * }
         */
        login: '/auth/login',
        
        /**
         * User registration endpoint
         * 
         * Expected request:
         * {
         *   name: string;
         *   email: string;
         *   password: string;
         * }
         * 
         * Expected response: Same as login endpoint
         */
        register: '/auth/register',
        
        /**
         * Password reset request endpoint
         * 
         * Expected request:
         * {
         *   email: string;
         * }
         * 
         * Expected response:
         * {
         *   success: boolean;
         *   message?: string;
         * }
         */
        resetPassword: '/auth/reset-password',
        
        /**
         * Token refresh endpoint
         * 
         * Expected request:
         * {
         *   refreshToken: string;
         * }
         * 
         * Expected response:
         * {
         *   token: string;
         *   refreshToken?: string;
         * }
         */
        refreshToken: '/auth/refresh-token',
        
        /**
         * User logout endpoint
         * 
         * Expected request: Empty (uses Authorization header)
         * Expected response: Status 200 OK
         */
        logout: '/auth/logout',
      },
      
      // User management endpoints
      users: {
        /**
         * Get current user profile
         * 
         * Expected response:
         * {
         *   id: string;
         *   name: string;
         *   email: string;
         *   role: string;
         *   // other profile fields...
         * }
         */
        current: '/users/me',
        
        /**
         * Get user profile by ID
         */
        profile: (id: string) => `/users/${id}`,
        
        /**
         * Get user settings
         * 
         * Expected response:
         * {
         *   notifications: { email: boolean, browser: boolean },
         *   privacy: { showProfile: boolean, showProjects: boolean }
         * }
         */
        settings: '/users/me/settings',
        
        /**
         * Update user profile
         * 
         * Expected request: Partial user profile
         * Expected response: Updated user profile
         */
        updateProfile: '/users/me',
        
        /**
         * Update user settings
         * 
         * Expected request: Partial settings object
         * Expected response: Updated settings object
         */
        updateSettings: '/users/me/settings',
        
        /**
         * Upload user avatar
         * 
         * Expected request: FormData with image file
         * Expected response: { avatarUrl: string }
         */
        uploadAvatar: '/users/me/avatar',
        
        /**
         * Get user statistics
         */
        stats: '/users/me/stats',
      },
      
      // Tutorial endpoints
      tutorials: {
        /**
         * Get all tutorials (paginated)
         */
        list: '/tutorials',
        
        /**
         * Get featured tutorials
         */
        featured: '/tutorials/featured',
        
        /**
         * Get trending tutorials
         */
        trending: '/tutorials/trending',
        
        /**
         * Get tutorial by ID
         */
        detail: (id: number) => `/tutorials/${id}`,
        
        /**
         * Get tutorial comments
         */
        comments: (id: number) => `/tutorials/${id}/comments`,
        
        /**
         * Create new tutorial
         */
        create: '/tutorials',
        
        /**
         * Update existing tutorial
         */
        update: (id: number) => `/tutorials/${id}`,
        
        /**
         * Delete tutorial
         */
        delete: (id: number) => `/tutorials/${id}`,
        
        /**
         * Like tutorial
         */
        like: (id: number) => `/tutorials/${id}/like`,
        
        /**
         * Unlike previously liked tutorial
         */
        unlike: (id: number) => `/tutorials/${id}/unlike`,
        
        /**
         * Rate tutorial (1-5 stars)
         */
        rate: (id: number) => `/tutorials/${id}/rate`,
      },
      
      // Project endpoints
      projects: {
        /**
         * Get all user projects
         */
        list: '/projects',
        
        /**
         * Get project by ID
         */
        detail: (id: number) => `/projects/${id}`,
        
        /**
         * Get project materials
         */
        materials: (id: number) => `/projects/${id}/materials`,
        
        /**
         * Get project steps
         */
        steps: (id: number) => `/projects/${id}/steps`,
        
        /**
         * Create new project
         */
        create: '/projects',
        
        /**
         * Update existing project
         */
        update: (id: number) => `/projects/${id}`,
        
        /**
         * Delete project
         */
        delete: (id: number) => `/projects/${id}`,
        
        /**
         * Share project with other users
         */
        share: (id: number) => `/projects/${id}/share`,
      },
      
      // Subscription endpoints
      subscriptions: {
        /**
         * Get current subscription
         */
        current: '/subscriptions/current',
        
        /**
         * Create new subscription
         */
        create: '/subscriptions',
        
        /**
         * Cancel subscription
         */
        cancel: '/subscriptions/cancel',
        
        /**
         * Get payment methods
         */
        paymentMethods: '/payment-methods',
        
        /**
         * Add payment method
         */
        addPaymentMethod: '/payment-methods',
        
        /**
         * Remove payment method
         */
        removePaymentMethod: (id: string) => `/payment-methods/${id}`,
        
        /**
         * Get transaction history
         */
        transactions: '/transactions',
      },
      
      // Community endpoints
      community: {
        /**
         * Get community posts
         */
        posts: '/community/posts',
        
        /**
         * Get post by ID
         */
        post: (id: string) => `/community/posts/${id}`,
        
        /**
         * Get post comments
         */
        comments: (id: string) => `/community/posts/${id}/comments`,
        
        /**
         * Like post
         */
        like: (id: string) => `/community/posts/${id}/like`,
        
        /**
         * Unlike post
         */
        unlike: (id: string) => `/community/posts/${id}/unlike`,
      },
      
      // Creator analytics endpoints
      analytics: {
        /**
         * Get analytics overview
         */
        overview: '/analytics/overview',
        
        /**
         * Get tutorial analytics
         */
        tutorials: '/analytics/tutorials',
        
        /**
         * Get revenue analytics
         */
        revenue: '/analytics/revenue',
        
        /**
         * Get audience analytics
         */
        audience: '/analytics/audience',
        
        /**
         * Get feedback analytics
         */
        feedback: '/analytics/feedback',
      },
      
      // Partner dashboard endpoints
      partners: {
        /**
         * Get partner statistics
         */
        stats: '/partners/stats',
        
        /**
         * Get partner products
         */
        products: '/partners/products',
        
        /**
         * Get partner orders
         */
        orders: '/partners/orders',
        
        /**
         * Get partner analytics
         */
        analytics: '/partners/analytics',
      },
    }
  },
  
  /**
   * Feature Flags
   * 
   * Controls enabling/disabling specific features
   */
  features: {
    enableAnalytics: true,
    enableNotifications: true,
    premiumFeatures: true,
  },

  /**
   * MongoDB Specific Settings
   * 
   * Configuration for handling MongoDB data structures
   */
  mongodb: {
    /**
     * Field Mappings from MongoDB to Frontend
     * 
     * Maps MongoDB field names to frontend field names
     * Example: MongoDB uses _id, frontend uses id
     */
    fieldMappings: {
      id: '_id', // MongoDB uses _id as primary key
    }
  }
};
