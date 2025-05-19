
import { apiClient } from './api';

/**
 * User service for managing user data, profiles, and settings
 */

// User types
export interface UserProfile {
  id: string;
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
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<UserProfile>('/users/me');
  }
  
  /**
   * Update user profile
   */
  async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<UserProfile>('/users/me', {
      method: 'PUT',
      body: profileData,
    });
  }
  
  /**
   * Get user settings
   */
  async getSettings(): Promise<UserSettings> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<UserSettings>('/users/me/settings');
  }
  
  /**
   * Update user settings
   */
  async updateSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<UserSettings>('/users/me/settings', {
      method: 'PUT',
      body: settings,
    });
  }
  
  /**
   * Upload avatar image
   */
  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    // 🔧 INTEGRATION: Replace with real file upload to backend/storage
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

