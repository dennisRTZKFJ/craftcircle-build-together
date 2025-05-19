
import { apiClient } from './api';
import { AppConfig } from '@/config/app.config';

/**
 * User service for managing user data, profiles, and settings
 * Integrates with Spring Boot user endpoints and MongoDB
 */

// User types
export interface UserProfile {
  id: string;   // Converted from MongoDB _id
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'diy' | 'creator' | 'partner' | 'admin';
}

export interface UserSettings {
  notifications: {
    email: boolean;
    browser: boolean;
  };
  privacy: {
    showProfile: boolean;
    showProjects: boolean;
  };
}

class UserService {
  /**
   * Get user profile data
   */
  async getProfile(): Promise<UserProfile> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // GET /users/me will return MongoDB user document
    const endpoint = AppConfig.api.endpoints.users.current;
    return apiClient.request<UserProfile>(endpoint);
  }
  
  /**
   * Update user profile
   */
  async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // PUT /users/me will update MongoDB user document
    const endpoint = AppConfig.api.endpoints.users.updateProfile;
    return apiClient.request<UserProfile>(endpoint, {
      method: 'PUT',
      body: profileData,
    });
  }
  
  /**
   * Get user settings
   */
  async getSettings(): Promise<UserSettings> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // GET /users/me/settings will return MongoDB settings document
    const endpoint = AppConfig.api.endpoints.users.settings;
    return apiClient.request<UserSettings>(endpoint);
  }
  
  /**
   * Update user settings
   */
  async updateSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // PUT /users/me/settings will update MongoDB settings document
    const endpoint = AppConfig.api.endpoints.users.updateSettings;
    return apiClient.request<UserSettings>(endpoint, {
      method: 'PUT',
      body: settings,
    });
  }
  
  /**
   * Upload avatar image
   */
  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    // 🔧 INTEGRATION: Replace with real file upload to Spring Boot endpoint
    // POST /users/me/avatar will upload file to storage and update MongoDB user document
    // In a real implementation, this would use FormData
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
        });
      }, 1000);
    });
  }
}

export const userService = new UserService();
