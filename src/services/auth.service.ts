
import { apiClient } from './api';
import { AppConfig } from '@/config/app.config';

/**
 * Authentication service for user login, registration, and session management
 * Handles JWT token storage and refresh for Spring Security integration
 */

export interface User {
  id: string;        // Converted from MongoDB _id
  name: string;
  email: string;
  role: 'diy' | 'creator' | 'partner' | 'admin';
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthResponse {
  user: User;
  token: string;      // JWT access token
  refreshToken?: string; // Optional refresh token
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
  private refreshTokenKey = 'craft_circle_refresh_token';
  private userKey = 'craft_circle_user';
  private tokenExpiryKey = 'craft_circle_token_expiry';
  
  /**
   * Login with email and password
   * @returns User object with authentication token
   */
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // 🔧 INTEGRATION: Replace mock implementation with Spring Security auth endpoint
      // POST /auth/login with credentials, expects JWT token response
      const endpoint = AppConfig.api.endpoints.auth.login;
      const response = await apiClient.request<AuthResponse>(endpoint, {
        method: 'POST',
        body: credentials,
      });
      
      // Store token and user data
      this.setAuthData(response);
      
      return response.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
  
  /**
   * Register a new user
   * @returns User object with authentication token
   */
  async register(data: RegisterData): Promise<User> {
    try {
      // 🔧 INTEGRATION: Replace mock implementation with Spring Security register endpoint
      // POST /auth/register with user data, expects JWT token response
      const endpoint = AppConfig.api.endpoints.auth.register;
      const response = await apiClient.request<AuthResponse>(endpoint, {
        method: 'POST',
        body: data,
      });
      
      // Store token and user data
      this.setAuthData(response);
      
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
      // 🔧 INTEGRATION: Replace mock implementation with Spring Security password reset endpoint
      // POST /auth/reset-password with email, triggers password reset email
      const endpoint = AppConfig.api.endpoints.auth.resetPassword;
      await apiClient.request(endpoint, {
        method: 'POST',
        body: { email },
      });
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  }
  
  /**
   * Refresh the access token using refresh token
   * @returns New auth tokens
   */
  async refreshToken(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      return false;
    }
    
    try {
      // 🔧 INTEGRATION: Replace with Spring Security token refresh endpoint
      // POST /auth/refresh-token with current refresh token, expects new JWT token pair
      const endpoint = AppConfig.api.endpoints.auth.refreshToken;
      const response = await apiClient.request<{token: string, refreshToken: string}>(endpoint, {
        method: 'POST',
        body: { refreshToken },
      });
      
      // Update stored tokens
      this.setToken(response.token);
      if (response.refreshToken) {
        this.setRefreshToken(response.refreshToken);
      }
      
      // Set new expiry (typically 1 hour from now)
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 1); // Adjust based on actual token lifetime
      this.setTokenExpiry(expiryTime.getTime());
      
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Clear auth data on refresh failure
      this.logout();
      return false;
    }
  }
  
  /**
   * Logout the current user
   */
  logout(): void {
    // Remove token and user data from storage
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.tokenExpiryKey);
    
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
   * Get the refresh token if available
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }
  
  /**
   * Check if a user is authenticated
   * Also performs token validation and auto-refresh if needed
   */
  async isAuthenticated(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;
    
    // Check if token is expired
    const expiry = this.getTokenExpiry();
    const now = Date.now();
    
    // If token is valid and not expired
    if (expiry && now < expiry) {
      return true;
    }
    
    // If token is expired but we have a refresh token, try to refresh
    if (this.getRefreshToken()) {
      return await this.refreshToken();
    }
    
    // No valid token and can't refresh
    return false;
  }
  
  /**
   * Set authentication data from login/register response
   */
  private setAuthData(data: AuthResponse): void {
    this.setToken(data.token);
    this.setUser(data.user);
    
    if (data.refreshToken) {
      this.setRefreshToken(data.refreshToken);
    }
    
    // Set token expiry (typically 1 hour from now)
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 1); // Adjust based on actual token lifetime
    this.setTokenExpiry(expiryTime.getTime());
  }
  
  /**
   * Store authentication token
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    apiClient.setAuthToken(token);
  }
  
  /**
   * Store refresh token
   */
  private setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  }
  
  /**
   * Store user data
   */
  private setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
  
  /**
   * Store token expiry timestamp
   */
  private setTokenExpiry(timestamp: number): void {
    localStorage.setItem(this.tokenExpiryKey, timestamp.toString());
  }
  
  /**
   * Get token expiry timestamp
   */
  private getTokenExpiry(): number | null {
    const expiry = localStorage.getItem(this.tokenExpiryKey);
    return expiry ? parseInt(expiry, 10) : null;
  }
}

export const authService = new AuthService();
