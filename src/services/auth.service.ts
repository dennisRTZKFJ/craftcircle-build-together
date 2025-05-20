
/**
 * Authentication Service
 * 
 * Manages user authentication, registration, and session handling.
 * Integrates with Spring Security JWT authentication.
 * 
 * This service:
 * - Handles login/register API calls
 * - Manages JWT token storage and refresh
 * - Provides authentication status checks
 * - Handles user logout
 */

import { apiClient } from './api';
import { AppConfig } from '@/config/app.config';

/**
 * User Interface
 * 
 * Represents a user in the system.
 * Maps to MongoDB user document structure.
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

/**
 * Authentication Response Interface
 * 
 * Represents the response from authentication endpoints.
 */
interface AuthResponse {
  user: User;
  token: string;      // JWT access token
  refreshToken?: string; // Optional refresh token
}

/**
 * Login Credentials Interface
 * 
 * Represents login request body
 */
interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration Data Interface
 * 
 * Represents registration request body
 */
interface RegisterData {
  name: string;
  email: string;
  password: string;
}

/**
 * Authentication Service Class
 * 
 * Handles all authentication-related functionality.
 * 
 * Usage example:
 * ```typescript
 * // Login
 * try {
 *   const user = await authService.login({
 *     email: 'user@example.com',
 *     password: 'password123'
 *   });
 *   console.log('Logged in as:', user.name);
 * } catch (err) {
 *   console.error('Login failed:', err);
 * }
 * 
 * // Check if user is authenticated
 * const isAuthenticated = await authService.isAuthenticated();
 * 
 * // Get current user
 * const currentUser = authService.getCurrentUser();
 * ```
 */
class AuthService {
  private tokenKey = 'craft_circle_auth_token';
  private refreshTokenKey = 'craft_circle_refresh_token';
  private userKey = 'craft_circle_user';
  private tokenExpiryKey = 'craft_circle_token_expiry';
  
  /**
   * Login with Email and Password
   * 
   * Authenticates a user and stores their session information.
   * 
   * @param credentials User login credentials
   * @returns User object
   * @throws Error if authentication fails
   * 
   * Production implementation:
   * - Sends credentials to Spring Security endpoint
   * - Receives JWT token if successful
   * - Stores token for subsequent API calls
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
   * Register New User
   * 
   * Creates a new user account and automatically logs them in.
   * 
   * @param data User registration data
   * @returns Newly created user
   * @throws Error if registration fails
   * 
   * Production implementation:
   * - Sends registration data to Spring Security endpoint
   * - Receives JWT token if successful
   * - Stores token for subsequent API calls
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
   * Reset Password
   * 
   * Initiates password reset process by sending email to user.
   * 
   * @param email User email address
   * @throws Error if reset request fails
   * 
   * Production implementation:
   * - Sends reset request to Spring Security endpoint
   * - Backend sends password reset email to user
   * - User clicks link in email to set new password
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
   * Refresh Authentication Token
   * 
   * Uses refresh token to obtain a new access token when the
   * current one expires. This maintains the user session.
   * 
   * @returns Success status
   * 
   * Production implementation:
   * - Sends refresh token to Spring Security endpoint
   * - Receives new access token (and optionally new refresh token)
   * - Updates stored tokens
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
   * Logout User
   * 
   * Ends the user session and clears authentication data.
   * 
   * Production implementation:
   * - Optionally invalidates token on backend
   * - Clears local storage and auth headers
   * - Redirects to login page
   */
  logout(): void {
    // 🔧 INTEGRATION: In a real implementation, you might want to invalidate the token on the server
    // POST /auth/logout with the current token

    // Remove token and user data from storage
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.tokenExpiryKey);
    
    // Clear authorization header
    apiClient.setAuthToken(null);
  }
  
  /**
   * Get Current User
   * 
   * Retrieves the currently authenticated user from storage.
   * 
   * @returns User object or null if not authenticated
   */
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }
  
  /**
   * Get Authentication Token
   * 
   * Retrieves the current JWT token from storage.
   * 
   * @returns JWT token or null
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  
  /**
   * Get Refresh Token
   * 
   * Retrieves the current refresh token from storage.
   * 
   * @returns Refresh token or null
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }
  
  /**
   * Check Authentication Status
   * 
   * Determines if user is currently authenticated with a valid token.
   * Automatically refreshes token if expired but refresh token is valid.
   * 
   * @returns Authentication status
   * 
   * Usage example:
   * ```typescript
   * // Check authentication before accessing protected resource
   * if (await authService.isAuthenticated()) {
   *   // User is authenticated, proceed
   *   loadUserData();
   * } else {
   *   // User is not authenticated, redirect to login
   *   navigate('/login');
   * }
   * ```
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
   * Set Authentication Data
   * 
   * Stores user session data from login/register response.
   * 
   * @param data Authentication response data
   * @private
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
   * Store Authentication Token
   * 
   * @param token JWT token
   * @private
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    apiClient.setAuthToken(token);
  }
  
  /**
   * Store Refresh Token
   * 
   * @param token Refresh token
   * @private
   */
  private setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  }
  
  /**
   * Store User Data
   * 
   * @param user User object
   * @private
   */
  private setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
  
  /**
   * Store Token Expiry Timestamp
   * 
   * @param timestamp Expiry timestamp in milliseconds
   * @private
   */
  private setTokenExpiry(timestamp: number): void {
    localStorage.setItem(this.tokenExpiryKey, timestamp.toString());
  }
  
  /**
   * Get Token Expiry Timestamp
   * 
   * @returns Expiry timestamp or null
   * @private
   */
  private getTokenExpiry(): number | null {
    const expiry = localStorage.getItem(this.tokenExpiryKey);
    return expiry ? parseInt(expiry, 10) : null;
  }
}

/**
 * Authentication Service Instance
 * 
 * Exported for use throughout the application
 */
export const authService = new AuthService();
