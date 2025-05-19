
import { apiClient } from './api';

/**
 * Authentication service for user login, registration, and session management
 */

interface User {
  id: string;
  name: string;
  email: string;
  role: 'diy' | 'creator' | 'partner' | 'admin';
  avatar?: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

class AuthService {
  private tokenKey = 'craft_circle_auth_token';
  private userKey = 'craft_circle_user';
  
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // 🔧 INTEGRATION: Replace mock implementation with real backend call
      const response = await apiClient.request<LoginResponse>('/auth/login', {
        method: 'POST',
        body: credentials,
      });
      
      // Store token and user data
      this.setToken(response.token);
      this.setUser(response.user);
      
      return response.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
  
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<User> {
    try {
      // 🔧 INTEGRATION: Replace mock implementation with real backend call
      const response = await apiClient.request<LoginResponse>('/auth/register', {
        method: 'POST',
        body: data,
      });
      
      // Store token and user data
      this.setToken(response.token);
      this.setUser(response.user);
      
      return response.user;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }
  
  /**
   * Reset password with email
   */
  async resetPassword(email: string): Promise<void> {
    try {
      // 🔧 INTEGRATION: Replace mock implementation with real backend call
      await apiClient.request('/auth/reset-password', {
        method: 'POST',
        body: { email },
      });
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  }
  
  /**
   * Logout the current user
   */
  logout(): void {
    // Remove token and user data from storage
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    
    // Clear authorization header
    apiClient.setAuthToken(null);
  }
  
  /**
   * Get the current authenticated user
   */
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }
  
  /**
   * Get the current authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  
  /**
   * Check if a user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
  /**
   * Store authentication token
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    apiClient.setAuthToken(token);
  }
  
  /**
   * Store user data
   */
  private setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
}

export const authService = new AuthService();

