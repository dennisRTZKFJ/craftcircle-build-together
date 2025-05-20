import { AppConfig } from '@/config/app.config';

/**
 * API Client Service
 * 
 * This service handles all HTTP requests to the backend API.
 * It provides:
 * - Authentication header management
 * - Error handling
 * - Response transformation (MongoDB -> Frontend)
 * - Mock data for development
 * 
 * When switching to production:
 * 1. Set useMockData to false in AppConfig
 * 2. Configure correct baseUrl
 * 3. Ensure all backend endpoints match the paths in AppConfig
 */

/**
 * API Request Options Interface
 * 
 * Defines the available options for API requests
 */
interface ApiRequestOptions {
  /** HTTP method to use */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  
  /** Request body (automatically converted to JSON) */
  body?: any;
  
  /** Additional headers to include */
  headers?: Record<string, string>;
  
  /** URL query parameters */
  params?: Record<string, string>;
}

/**
 * API Client Class
 * 
 * Handles API requests, authentication, and response processing
 */
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  /**
   * Constructor
   * @param baseUrl Base URL for all API requests
   */
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  /**
   * Set Authentication Token
   * 
   * Updates the default headers with the JWT authentication token.
   * Should be called after successful login and token refresh.
   * 
   * @param token JWT token from authentication
   * 
   * Example usage:
   * ```typescript
   * // After login:
   * const authResponse = await loginUser(credentials);
   * apiClient.setAuthToken(authResponse.token);
   * 
   * // To clear token (during logout):
   * apiClient.setAuthToken(null);
   * ```
   */
  setAuthToken(token: string | null) {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders['Authorization'];
    }
  }

  /**
   * Build URL with Query Parameters
   * 
   * Constructs a full URL including any query parameters
   * 
   * @param endpoint API endpoint path
   * @param params Query parameters object
   * @returns Complete URL string
   * @private
   */
  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = `${this.baseUrl}${endpoint}`;
    
    if (!params) return url;
    
    const queryString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    
    return `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
  }

  /**
   * Handle API Errors
   * 
   * Processes API errors consistently, providing better error messages
   * and handling special cases like authentication failures
   * 
   * @param error Error object from fetch
   * @param endpoint API endpoint that was accessed
   * @returns Never - always throws an error
   * @private
   */
  private handleApiError(error: any, endpoint: string): never {
    // Log error for debugging
    console.error(`API Error (${endpoint}):`, error);
    
    // Determine error type and message
    const errorMessage = error.message || 'Unknown API error';
    
    // Handle specific HTTP errors
    if (error.status === 401) {
      // 401 Unauthorized - Clear auth state and redirect to login
      // This will be handled by the auth interceptor
      throw new Error('Authentication failed. Please log in again.');
    }
    
    // Generic error with endpoint context
    throw new Error(`API request failed (${endpoint}): ${errorMessage}`);
  }

  /**
   * Transform MongoDB Response to Frontend Format
   * 
   * Recursively processes API responses to transform MongoDB-style
   * documents to frontend format (e.g. _id → id)
   * 
   * @param data Response data to transform
   * @returns Transformed data
   * @private
   * 
   * Example transformation:
   * ```
   * Input: { _id: "123", name: "Project", items: [{ _id: "456", title: "Item" }] }
   * Output: { id: "123", name: "Project", items: [{ id: "456", title: "Item" }] }
   * ```
   */
  private transformResponse(data: any): any {
    if (!data) return data;
    
    // Handle arrays
    if (Array.isArray(data)) {
      return data.map(item => this.transformResponse(item));
    }
    
    // Handle objects
    if (typeof data === 'object') {
      const transformed: Record<string, any> = { ...data };
      
      // Transform _id to id if needed
      if (transformed._id && !transformed.id) {
        transformed.id = transformed._id;
        delete transformed._id;
      }
      
      // Process nested objects
      Object.keys(transformed).forEach(key => {
        if (typeof transformed[key] === 'object' && transformed[key] !== null) {
          transformed[key] = this.transformResponse(transformed[key]);
        }
      });
      
      return transformed;
    }
    
    return data;
  }

  /**
   * Make API Request
   * 
   * Main method to make requests to the API.
   * If useMockData is true, it returns mock data instead.
   * 
   * @param endpoint API endpoint path
   * @param options Request options
   * @returns Promise with the response data
   * 
   * Example usage:
   * ```typescript
   * // GET request
   * const users = await apiClient.request<User[]>('/users');
   * 
   * // POST request with body
   * const newUser = await apiClient.request<User>('/users', {
   *   method: 'POST',
   *   body: { name: 'John', email: 'john@example.com' }
   * });
   * 
   * // With query parameters
   * const filteredProjects = await apiClient.request<Project[]>('/projects', {
   *   params: { status: 'active', sort: 'date' }
   * });
   * ```
   */
  async request<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
    if (AppConfig.useMockData) {
      // 🔧 MOCK: Using mock data, replace with actual API calls when backend is ready
      console.log(`MOCK API Call: ${endpoint}`);
      const mockData = await this.getMockData(endpoint, options);
      return mockData as T;
    }

    // Real API request implementation for Spring Boot backend
    const { method = 'GET', body, headers = {}, params } = options;
    
    try {
      const requestHeaders = {
        ...this.defaultHeaders,
        ...headers,
      };
      
      const url = this.buildUrl(endpoint, params);
      
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });
      
      if (!response.ok) {
        // Handle different error status codes
        const errorData = await response.json().catch(() => null);
        const error = new Error(errorData?.message || `HTTP error ${response.status}`);
        (error as any).status = response.status;
        (error as any).data = errorData;
        throw error;
      }
      
      // Handle empty responses (like 204 No Content)
      if (response.status === 204) {
        return {} as T;
      }
      
      const data = await response.json();
      
      // Transform MongoDB response to frontend format
      const transformedData = this.transformResponse(data);
      
      return transformedData as T;
    } catch (error) {
      return this.handleApiError(error, endpoint);
    }
  }

  /**
   * Get Mock Data for Development
   * 
   * Returns mock data for the specified endpoint during development.
   * This function will be replaced with actual API calls in production.
   * 
   * @param endpoint API endpoint path
   * @param options Request options
   * @returns Mock response data
   * @private
   */
  private async getMockData(endpoint: string, options: ApiRequestOptions): Promise<any> {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 🔧 MOCK: Replace with actual API implementation
    // This is just a mock implementation to simulate different endpoints
    if (endpoint.startsWith('/auth')) {
      return mockAuthData(endpoint, options);
    }
    
    if (endpoint.startsWith('/users')) {
      return mockUserData(endpoint, options);
    }
    
    if (endpoint.startsWith('/tutorials')) {
      return mockTutorialData(endpoint, options);
    }

    if (endpoint.startsWith('/projects')) {
      return mockProjectData(endpoint, options);
    }
    
    if (endpoint.startsWith('/subscriptions')) {
      return mockSubscriptionData(endpoint, options);
    }
    
    if (endpoint.startsWith('/payment-methods')) {
      return mockPaymentMethodData(endpoint, options);
    }
    
    if (endpoint.startsWith('/transactions')) {
      return mockTransactionData(endpoint, options);
    }
    
    return { message: 'No mock data available for this endpoint' };
  }
}

// MOCK: The following mock data implementations will be replaced with actual API calls in production
// 🔧 MOCK: These mock functions will be removed when connecting to real Spring Boot backend

/**
 * Mock Authentication Data
 * 
 * Provides mock responses for auth-related endpoints
 */
function mockAuthData(endpoint: string, options: ApiRequestOptions): any {
  if (endpoint === '/auth/login') {
    // 🔧 INTEGRATION: Real endpoint will be POST /auth/login with JWT response
    return {
      user: {
        _id: 'user-1', // MongoDB style ID
        name: 'John Doe',
        email: 'john@example.com',
        role: 'diy',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        createdAt: new Date().toISOString(), // MongoDB standard fields
        updatedAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
    };
  }
  
  if (endpoint === '/auth/register') {
    // 🔧 INTEGRATION: Real endpoint will be POST /auth/register with JWT response
    return {
      user: {
        _id: 'new-user-1', // MongoDB style ID
        name: options.body?.name || 'New User',
        email: options.body?.email || 'new@example.com',
        role: 'diy',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
    };
  }
  
  if (endpoint === '/auth/refresh-token') {
    // 🔧 INTEGRATION: Real endpoint will be POST /auth/refresh-token with JWT response
    return {
      token: 'new-mock-jwt-token',
      refreshToken: 'new-mock-refresh-token',
    };
  }
  
  return { error: 'Unknown auth endpoint' };
}

/**
 * Mock User Data
 * 
 * Provides mock responses for user-related endpoints
 */
function mockUserData(endpoint: string, options: ApiRequestOptions): any {
  if (endpoint === '/users/me') {
    // 🔧 INTEGRATION: Real endpoint will be GET /users/me with user profile data
    return {
      _id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'diy',
      subscription: 'premium',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      createdAt: '2025-01-15T08:30:00Z',
      updatedAt: '2025-05-10T14:22:10Z',
    };
  }
  
  if (endpoint === '/users/me/settings') {
    // 🔧 INTEGRATION: Real endpoint will be GET /users/me/settings with user settings
    if (options.method === 'GET') {
      return {
        _id: 'settings-1',
        userId: 'user-1',
        notifications: {
          email: true,
          browser: true,
        },
        privacy: {
          showProfile: true,
          showProjects: true,
        },
        createdAt: '2025-01-15T08:30:00Z',
        updatedAt: '2025-05-10T14:22:10Z',
      };
    }
    
    // 🔧 INTEGRATION: Real endpoint will be PUT /users/me/settings to update settings
    if (options.method === 'PUT') {
      return {
        _id: 'settings-1',
        userId: 'user-1',
        ...options.body,
        updatedAt: new Date().toISOString(),
      };
    }
  }
  
  return { error: 'Unknown user endpoint' };
}

/**
 * Mock Tutorial Data
 * 
 * Provides mock responses for tutorial-related endpoints
 */
function mockTutorialData(endpoint: string, options: ApiRequestOptions): any {
  const tutorials = [
    { 
      _id: 1, 
      title: 'Building a Walnut Coffee Table', 
      status: 'published',
      views: 2456,
      likes: 145, 
      comments: 32,
      revenue: '€124,50',
      date: '04/10/2025',
      image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90',
      createdAt: '2025-04-10T08:30:00Z',
      updatedAt: '2025-05-12T14:22:10Z',
    },
    { 
      _id: 2, 
      title: 'Wall Shelves with Invisible Mounts', 
      status: 'published',
      views: 1845,
      likes: 98, 
      comments: 18, 
      revenue: '€78,20',
      date: '04/25/2025',
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f',
      createdAt: '2025-04-25T10:15:00Z',
      updatedAt: '2025-05-11T09:42:30Z',
    },
    { 
      _id: 3, 
      title: 'Modular Solid Wood Shelving System', 
      status: 'published',
      views: 3210,
      likes: 203, 
      comments: 45, 
      revenue: '€187,90',
      date: '05/02/2025',
      image: 'https://images.unsplash.com/photo-1588200618450-3a5b1d3b9aa5',
      createdAt: '2025-05-02T12:20:00Z',
      updatedAt: '2025-05-14T16:35:45Z',
    },
    { 
      _id: 4, 
      title: 'Rustic Dining Table with Epoxy Resin', 
      status: 'draft',
      views: 0,
      likes: 0, 
      comments: 0, 
      revenue: '€0,00',
      date: '05/14/2025',
      image: 'https://images.unsplash.com/photo-1604074131665-7a4b13870ab2',
      createdAt: '2025-05-14T15:45:00Z',
      updatedAt: '2025-05-14T15:45:00Z',
    },
  ];
  
  // 🔧 INTEGRATION: Real endpoint will be GET /tutorials with pagination and filtering
  if (endpoint === '/tutorials' && options.method === 'GET') {
    return tutorials;
  }
  
  // 🔧 INTEGRATION: Real endpoint will be POST /tutorials to create new tutorial
  if (endpoint === '/tutorials' && options.method === 'POST') {
    const newTutorial = {
      _id: tutorials.length + 1,
      ...options.body,
      views: 0,
      likes: 0,
      comments: 0,
      revenue: '€0,00',
      status: 'draft',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newTutorial;
  }
  
  // 🔧 INTEGRATION: Real endpoint will be GET /tutorials/{id} to get specific tutorial
  if (endpoint.match(/\/tutorials\/\d+$/) && options.method === 'GET') {
    const tutorialId = parseInt(endpoint.split('/').pop() || '0');
    return tutorials.find(t => t._id === tutorialId) || { error: 'Tutorial not found' };
  }
  
  // 🔧 INTEGRATION: Real endpoint will be PUT /tutorials/{id} to update tutorial
  if (endpoint.match(/\/tutorials\/\d+$/) && options.method === 'PUT') {
    const tutorialId = parseInt(endpoint.split('/').pop() || '0');
    const tutorial = tutorials.find(t => t._id === tutorialId);
    if (!tutorial) {
      return { error: 'Tutorial not found' };
    }
    return {
      ...tutorial,
      ...options.body,
      updatedAt: new Date().toISOString(),
    };
  }
  
  // 🔧 INTEGRATION: Real endpoint will be DELETE /tutorials/{id} to remove tutorial
  if (endpoint.match(/\/tutorials\/\d+$/) && options.method === 'DELETE') {
    return {};
  }
  
  // 🔧 INTEGRATION: Real endpoint will be GET /tutorials/{id}/comments for tutorial comments
  if (endpoint.match(/\/tutorials\/\d+\/comments$/)) {
    return [
      {
        _id: 'c1',
        tutorialId: parseInt(endpoint.split('/')[2]),
        userId: 'user-2',
        user: {
          name: 'Julia Bauer',
          avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56'
        },
        text: 'Your coffee table instructions were super detailed - I managed to make it as a beginner!',
        createdAt: '2025-05-17T14:22:10Z',
        likes: 28
      },
      {
        _id: 'c2',
        tutorialId: parseInt(endpoint.split('/')[2]),
        userId: 'user-3',
        user: {
          name: 'Mark Weber',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
        },
        text: 'The idea with the invisible mounts is genius! It gave me a much cleaner result.',
        createdAt: '2025-05-16T09:15:30Z',
        likes: 16
      }
    ];
  }
  
  // 🔧 INTEGRATION: Real endpoint will be POST /tutorials/{id}/comments to add a comment
  if (endpoint.match(/\/tutorials\/\d+\/comments$/)) {
    return {
      _id: `c${Date.now()}`,
      tutorialId: parseInt(endpoint.split('/')[2]),
      userId: 'user-1',
      user: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
      },
      text: options.body?.comment || '',
      createdAt: new Date().toISOString(),
      likes: 0
    };
  }
  
  return { error: 'Unknown tutorials endpoint' };
}

/**
 * Mock Project Data
 * 
 * Provides mock responses for project-related endpoints
 */
function mockProjectData(endpoint: string, options: ApiRequestOptions): any {
  const projects = [
    { 
      _id: 1, 
      name: "Coffee Table", 
      status: "completed",
      description: "Mid-century inspired coffee table with walnut finish",
      createdAt: "2025-03-15T10:24:30Z",
      updatedAt: "2025-04-20T18:30:15Z",
    },
    { 
      _id: 2, 
      name: "Wall Shelf", 
      status: "in-progress",
      description: "Floating wall shelf with hidden brackets",
      createdAt: "2025-04-02T14:10:22Z",
      updatedAt: "2025-05-10T09:45:12Z",
    },
    { 
      _id: 3, 
      name: "Oak Desk", 
      status: "in-progress",
      description: "Home office desk with cable management",
      createdAt: "2025-04-18T08:22:45Z",
      updatedAt: "2025-05-12T16:08:33Z",
    },
    { 
      _id: 4, 
      name: "Coat Rack", 
      status: "planned",
      description: "Entryway coat rack with shelf",
      createdAt: "2025-05-01T11:42:18Z",
      updatedAt: "2025-05-01T11:42:18Z",
    },
    { 
      _id: 5, 
      name: "Side Table", 
      status: "abandoned",
      description: "Bedside table with drawer",
      createdAt: "2025-02-20T15:35:40Z",
      updatedAt: "2025-03-10T17:22:05Z",
    }
  ];
  
  // 🔧 INTEGRATION: Real endpoint will be GET /projects with pagination and filtering
  if (endpoint === '/projects' && options.method === 'GET') {
    return projects;
  }
  
  // 🔧 INTEGRATION: Real endpoint will be POST /projects to create new project
  if (endpoint === '/projects' && options.method === 'POST') {
    const newProject = {
      _id: projects.length + 1,
      ...options.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newProject;
  }
  
  // 🔧 INTEGRATION: Real endpoint will be GET /projects/{id} to get specific project
  if (endpoint.match(/\/projects\/\d+$/) && options.method === 'GET') {
    const projectId = parseInt(endpoint.split('/').pop() || '0');
    return projects.find(p => p._id === projectId) || { error: 'Project not found' };
  }
  
  // 🔧 INTEGRATION: Real endpoint will be PUT /projects/{id} to update project
  if (endpoint.match(/\/projects\/\d+$/) && options.method === 'PUT') {
    const projectId = parseInt(endpoint.split('/').pop() || '0');
    const project = projects.find(p => p._id === projectId);
    if (!project) {
      return { error: 'Project not found' };
    }
    return {
      ...project,
      ...options.body,
      updatedAt: new Date().toISOString(),
    };
  }
  
  // 🔧 INTEGRATION: Real endpoint will be DELETE /projects/{id} to remove project
  if (endpoint.match(/\/projects\/\d+$/) && options.method === 'DELETE') {
    return {};
  }
  
  // 🔧 INTEGRATION: Real endpoint will be GET /projects/{id}/materials for project materials
  if (endpoint.match(/\/projects\/\d+\/materials$/)) {
    return [
      { _id: 'm1', name: 'Walnut Boards', quantity: 4, unit: 'pieces', acquired: true },
      { _id: 'm2', name: 'Wood Screws', quantity: 12, unit: 'pieces', acquired: true },
      { _id: 'm3', name: 'Wood Stain', quantity: 1, unit: 'can', acquired: false },
    ];
  }
  
  // 🔧 INTEGRATION: Real endpoint will be POST /projects/{id}/materials to add material
  if (endpoint.match(/\/projects\/\d+\/materials$/) && options.method === 'POST') {
    return {
      _id: `m${Date.now()}`,
      ...options.body,
    };
  }
  
  // 🔧 INTEGRATION: Real endpoint will be GET /projects/{id}/steps for project steps
  if (endpoint.match(/\/projects\/\d+\/steps$/)) {
    return [
      { _id: 's1', title: 'Cut the wood', description: 'Cut all boards to size', completed: true },
      { _id: 's2', title: 'Sand surfaces', description: 'Sand all surfaces with 120 grit', completed: true },
      { _id: 's3', title: 'Assemble frame', description: 'Screw the frame together', completed: false },
    ];
  }
  
  // 🔧 INTEGRATION: Real endpoint will be PATCH /projects/{id}/steps/{stepId} to update step status
  if (endpoint.match(/\/projects\/\d+\/steps\/\w+$/) && options.method === 'PATCH') {
    return {
      _id: endpoint.split('/').pop(),
      ...options.body,
      updatedAt: new Date().toISOString(),
    };
  }
  
  return { error: 'Unknown projects endpoint' };
}

/**
 * Mock Subscription Data
 * 
 * Provides mock responses for subscription-related endpoints
 */
function mockSubscriptionData(endpoint: string, options: ApiRequestOptions): any {
  // 🔧 INTEGRATION: Real endpoint will be GET /subscriptions/current for user subscription
  if (endpoint === '/subscriptions/current' && options.method === 'GET') {
    return {
      _id: 'sub-1',
      status: 'active',
      plan: 'monthly',
      renewalDate: '2025-06-15',
      createdAt: '2025-01-15T08:30:00Z',
      updatedAt: '2025-05-15T14:22:10Z',
    };
  }
  
  // 🔧 INTEGRATION: Real endpoint will be POST /subscriptions to create subscription
  if (endpoint === '/subscriptions' && options.method === 'POST') {
    return {
      _id: 'sub-2',
      status: 'active',
      plan: options.body?.plan || 'monthly',
      renewalDate: '2025-06-15',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  
  // 🔧 INTEGRATION: Real endpoint will be DELETE /subscriptions/current to cancel subscription
  if (endpoint === '/subscriptions/current' && options.method === 'DELETE') {
    return {};
  }
  
  return { error: 'Unknown subscription endpoint' };
}

/**
 * Mock Payment Method Data
 * 
 * Provides mock responses for payment method-related endpoints
 */
function mockPaymentMethodData(endpoint: string, options: ApiRequestOptions): any {
  // 🔧 INTEGRATION: Real endpoint will be GET /payment-methods for user payment methods
  if (endpoint === '/payment-methods' && options.method === 'GET') {
    return [
      {
        _id: 'pm-1',
        type: 'card',
        last4: '4242',
        expiryMonth: 12,
        expiryYear: 2025,
        brand: 'Visa',
        createdAt: '2025-01-15T08:30:00Z',
        updatedAt: '2025-01-15T08:30:00Z',
      },
      {
        _id: 'pm-2',
        type: 'paypal',
        createdAt: '2025-02-20T11:45:12Z',
        updatedAt: '2025-02-20T11:45:12Z',
      }
    ];
  }
  
  // 🔧 INTEGRATION: Real endpoint will be POST /payment-methods to add payment method
  if (endpoint === '/payment-methods' && options.method === 'POST') {
    return {
      _id: `pm-${Date.now()}`,
      type: options.body?.type || 'card',
      last4: options.body?.last4 || '4242',
      expiryMonth: options.body?.expiryMonth || 12,
      expiryYear: options.body?.expiryYear || 2025,
      brand: options.body?.brand || 'Visa',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  
  // 🔧 INTEGRATION: Real endpoint will be DELETE /payment-methods/{id} to remove payment method
  if (endpoint.match(/\/payment-methods\/[\w-]+$/) && options.method === 'DELETE') {
    return {};
  }
  
  return { error: 'Unknown payment-methods endpoint' };
}

/**
 * Mock Transaction Data
 * 
 * Provides mock responses for transaction-related endpoints
 */
function mockTransactionData(endpoint: string, options: ApiRequestOptions): any {
  // 🔧 INTEGRATION: Real endpoint will be GET /transactions for user transaction history
  if (endpoint === '/transactions' && options.method === 'GET') {
    return [
      {
        _id: 'txn-1',
        date: '2025-05-15T00:00:00Z',
        type: 'payment',
        description: 'Monthly subscription payment',
        amount: '9.99',
        createdAt: '2025-05-15T08:30:00Z',
        updatedAt: '2025-05-15T08:30:00Z',
      },
      {
        _id: 'txn-2',
        date: '2025-05-10T00:00:00Z',
        type: 'income',
        description: 'Tutorial earnings payout',
        amount: '124.50',
        createdAt: '2025-05-10T14:22:10Z',
        updatedAt: '2025-05-10T14:22:10Z',
      },
      {
        _id: 'txn-3',
        date: '2025-04-15T00:00:00Z',
        type: 'payment',
        description: 'Monthly subscription payment',
        amount: '9.99',
        createdAt: '2025-04-15T08:30:00Z',
        updatedAt: '2025-04-15T08:30:00Z',
      },
    ];
  }
  
  return { error: 'Unknown transactions endpoint' };
}

/**
 * API Client Instance
 * 
 * Created and exported for use throughout the application
 */
export const apiClient = new ApiClient(AppConfig.api.baseUrl);
