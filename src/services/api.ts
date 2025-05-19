
import { AppConfig } from '@/config/app.config';

/**
 * API client for making requests to the backend
 * Currently returns mock data, but can be connected to real endpoints later
 */

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Set authentication token for subsequent requests
   */
  setAuthToken(token: string | null) {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders['Authorization'];
    }
  }

  /**
   * Make a request to the API
   * If useMockData is true, it will return mock data instead
   */
  async request<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
    if (AppConfig.useMockData) {
      // 🔧 MOCK: Using mock data, replace with actual API calls when backend is ready
      const mockData = await this.getMockData(endpoint, options);
      return mockData as T;
    }

    // Real API request implementation
    const { method = 'GET', body, headers = {} } = options;
    
    try {
      const requestHeaders = {
        ...this.defaultHeaders,
        ...headers,
      };
      
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
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
    
    return { message: 'No mock data available for this endpoint' };
  }
}

// Mock data implementations
function mockAuthData(endpoint: string, options: ApiRequestOptions): any {
  if (endpoint === '/auth/login') {
    return {
      user: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'diy',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      },
      token: 'mock-jwt-token',
    };
  }
  
  if (endpoint === '/auth/register') {
    return {
      user: {
        id: 'new-user-1',
        name: options.body?.name || 'New User',
        email: options.body?.email || 'new@example.com',
        role: 'diy',
      },
      token: 'mock-jwt-token',
    };
  }
  
  return { error: 'Unknown auth endpoint' };
}

function mockUserData(endpoint: string, options: ApiRequestOptions): any {
  if (endpoint === '/users/me') {
    return {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'diy',
      subscription: 'premium',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    };
  }
  
  return { error: 'Unknown user endpoint' };
}

function mockTutorialData(endpoint: string, options: ApiRequestOptions): any {
  const tutorials = [
    { 
      id: 1, 
      title: 'Building a Walnut Coffee Table', 
      status: 'published',
      views: 2456,
      likes: 145, 
      comments: 32,
      revenue: '€124,50',
      date: '04/10/2025',
      image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90'
    },
    { 
      id: 2, 
      title: 'Wall Shelves with Invisible Mounts', 
      status: 'published',
      views: 1845,
      likes: 98, 
      comments: 18, 
      revenue: '€78,20',
      date: '04/25/2025',
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f'
    },
    { 
      id: 3, 
      title: 'Modular Solid Wood Shelving System', 
      status: 'published',
      views: 3210,
      likes: 203, 
      comments: 45, 
      revenue: '€187,90',
      date: '05/02/2025',
      image: 'https://images.unsplash.com/photo-1588200618450-3a5b1d3b9aa5'
    },
    { 
      id: 4, 
      title: 'Rustic Dining Table with Epoxy Resin', 
      status: 'draft',
      views: 0,
      likes: 0, 
      comments: 0, 
      revenue: '€0,00',
      date: '05/14/2025',
      image: 'https://images.unsplash.com/photo-1604074131665-7a4b13870ab2'
    },
  ];
  
  // Return a specific tutorial by ID
  if (endpoint.match(/\/tutorials\/\d+$/)) {
    const tutorialId = parseInt(endpoint.split('/').pop() || '0');
    return tutorials.find(t => t.id === tutorialId) || { error: 'Tutorial not found' };
  }
  
  // Return all tutorials
  return tutorials;
}

function mockProjectData(endpoint: string, options: ApiRequestOptions): any {
  const projects = [
    { id: 1, name: "Coffee Table", status: "completed" },
    { id: 2, name: "Wall Shelf", status: "in-progress" },
    { id: 3, name: "Oak Desk", status: "in-progress" },
    { id: 4, name: "Coat Rack", status: "planned" },
    { id: 5, name: "Side Table", status: "abandoned" }
  ];
  
  // Return a specific project by ID
  if (endpoint.match(/\/projects\/\d+$/)) {
    const projectId = parseInt(endpoint.split('/').pop() || '0');
    return projects.find(p => p.id === projectId) || { error: 'Project not found' };
  }
  
  // Return all projects
  return projects;
}

// Create and export API client instance
export const apiClient = new ApiClient(AppConfig.api.baseUrl);

