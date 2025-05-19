
import { apiClient } from './api';

/**
 * Tutorial service for managing tutorials
 */

export interface Tutorial {
  id: number;
  title: string;
  description?: string;
  status: 'draft' | 'published' | 'archived';
  views?: number;
  likes?: number;
  comments?: number;
  revenue?: string;
  date?: string;
  image?: string;
  content?: TutorialContent;
  materials?: TutorialMaterial[];
}

export interface TutorialContent {
  sections: TutorialSection[];
}

export interface TutorialSection {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
}

export interface TutorialMaterial {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  optional: boolean;
}

export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  comment: string;
  tutorial: string;
  date: string;
  likes: number;
}

class TutorialService {
  /**
   * Get all tutorials
   */
  async getTutorials(): Promise<Tutorial[]> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<Tutorial[]>('/tutorials');
  }
  
  /**
   * Get a specific tutorial by ID
   */
  async getTutorial(id: number): Promise<Tutorial> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<Tutorial>(`/tutorials/${id}`);
  }
  
  /**
   * Create a new tutorial
   */
  async createTutorial(tutorial: Omit<Tutorial, 'id'>): Promise<Tutorial> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<Tutorial>('/tutorials', {
      method: 'POST',
      body: tutorial,
    });
  }
  
  /**
   * Update an existing tutorial
   */
  async updateTutorial(id: number, tutorial: Partial<Tutorial>): Promise<Tutorial> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<Tutorial>(`/tutorials/${id}`, {
      method: 'PUT',
      body: tutorial,
    });
  }
  
  /**
   * Delete a tutorial
   */
  async deleteTutorial(id: number): Promise<void> {
    // 🔧 INTEGRATION: Replace with real backend call
    await apiClient.request(`/tutorials/${id}`, {
      method: 'DELETE',
    });
  }
  
  /**
   * Get comments for a tutorial
   */
  async getComments(tutorialId: number): Promise<Comment[]> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<Comment[]>(`/tutorials/${tutorialId}/comments`);
  }
  
  /**
   * Add a comment to a tutorial
   */
  async addComment(tutorialId: number, comment: string): Promise<Comment> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<Comment>(`/tutorials/${tutorialId}/comments`, {
      method: 'POST',
      body: { comment },
    });
  }
}

export const tutorialService = new TutorialService();

