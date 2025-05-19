
import { AppConfig } from '@/config/app.config';

/**
 * API client for making requests to the Spring Boot backend
 * Currently returns mock data, but can be connected to real endpoints later
 */

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  /**
   * Set authentication token for subsequent requests
   * @param token JWT token from Spring Security
   */
  setAuthToken(token: string | null) {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders['Authorization'];
    }
  }

  /**
   * Build URL with query parameters
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
   * Handle API errors consistently
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
   * Transform MongoDB response to frontend format
   * Handles things like _id to id conversion
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
   * Make a request to the API
   * If useMockData is true, it will return mock data instead
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
   * Return mock data for development
   * This function will be replaced with actual API calls in production
   */
  private async getMockData(endpoint: string, options: ApiRequestOptions): Promise<any> {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 🔧 TODO: Replace with actual API implementation
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
    
    return { message: 'No mock data available for this endpoint' };
  }
}

// Mock data implementations - these would be removed in production
// 🔧 MOCK: These mock functions will be replaced with actual API calls
function mockAuthData(endpoint: string, options: ApiRequestOptions): any {
  if (endpoint === '/auth/login') {
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
    return {
      token: 'new-mock-jwt-token',
      refreshToken: 'new-mock-refresh-token',
    };
  }
  
  return { error: 'Unknown auth endpoint' };
}

function mockUserData(endpoint: string, options: ApiRequestOptions): any {
  if (endpoint === '/users/me') {
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
  
  return { error: 'Unknown user endpoint' };
}

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
  
  // Return a specific tutorial by ID
  if (endpoint.match(/\/tutorials\/\d+$/)) {
    const tutorialId = parseInt(endpoint.split('/').pop() || '0');
    return tutorials.find(t => t._id === tutorialId) || { error: 'Tutorial not found' };
  }
  
  // Return tutorial comments
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
  
  // Return all tutorials
  return tutorials;
}

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
  
  // Return a specific project by ID
  if (endpoint.match(/\/projects\/\d+$/)) {
    const projectId = parseInt(endpoint.split('/').pop() || '0');
    return projects.find(p => p._id === projectId) || { error: 'Project not found' };
  }
  
  // Return project materials
  if (endpoint.match(/\/projects\/\d+\/materials$/)) {
    return [
      { _id: 'm1', name: 'Walnut Boards', quantity: 4, unit: 'pieces', acquired: true },
      { _id: 'm2', name: 'Wood Screws', quantity: 12, unit: 'pieces', acquired: true },
      { _id: 'm3', name: 'Wood Stain', quantity: 1, unit: 'can', acquired: false },
    ];
  }
  
  // Return project steps
  if (endpoint.match(/\/projects\/\d+\/steps$/)) {
    return [
      { _id: 's1', title: 'Cut the wood', description: 'Cut all boards to size', completed: true },
      { _id: 's2', title: 'Sand surfaces', description: 'Sand all surfaces with 120 grit', completed: true },
      { _id: 's3', title: 'Assemble frame', description: 'Screw the frame together', completed: false },
    ];
  }
  
  // Return all projects
  return projects;
}

function mockSubscriptionData(endpoint: string, options: ApiRequestOptions): any {
  if (endpoint === '/subscriptions/current') {
    return {
      _id: 'sub-1',
      status: 'active',
      plan: 'monthly',
      renewalDate: '2025-06-15',
      createdAt: '2025-01-15T08:30:00Z',
      updatedAt: '2025-05-15T14:22:10Z',
    };
  }
  
  if (options.method === 'POST') {
    return {
      _id: 'sub-2',
      status: 'active',
      plan: options.body?.plan || 'monthly',
      renewalDate: '2025-06-15',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  
  return { error: 'Unknown subscription endpoint' };
}

// Create and export API client instance
export const apiClient = new ApiClient(AppConfig.api.baseUrl);
