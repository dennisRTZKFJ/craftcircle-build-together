
import { apiClient } from './api';
import { AppConfig } from '@/config/app.config';

/**
 * Tutorial service for managing tutorials
 * Integrates with Spring Boot tutorial endpoints and MongoDB
 */

export interface Tutorial {
  id: number;            // Converted from MongoDB _id
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
  createdAt?: string;    // MongoDB timestamp
  updatedAt?: string;    // MongoDB timestamp
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
  id: number;            // Converted from MongoDB _id
  name: string;
  quantity: number;
  unit: string;
  optional: boolean;
}

export interface Comment {
  id: string;            // Converted from MongoDB _id
  user: {
    name: string;
    avatar: string;
  };
  comment: string;
  tutorial: string;
  date: string;
  likes: number;
  createdAt?: string;    // MongoDB timestamp
  updatedAt?: string;    // MongoDB timestamp
}

export interface TutorialRating {
  id: string;            // Converted from MongoDB _id
  value: number;         // 1-5 stars
  userId: string;
  tutorialId: number;
  createdAt?: string;    // MongoDB timestamp
}

class TutorialService {
  /**
   * Get all tutorials
   */
  async getTutorials(): Promise<Tutorial[]> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // GET /tutorials will return array of MongoDB tutorial documents
    const endpoint = AppConfig.api.endpoints.tutorials.list;
    return apiClient.request<Tutorial[]>(endpoint);
  }
  
  /**
   * Get featured tutorials
   */
  async getFeaturedTutorials(): Promise<Tutorial[]> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // GET /tutorials/featured will return array of featured tutorial documents
    const endpoint = AppConfig.api.endpoints.tutorials.featured;
    return apiClient.request<Tutorial[]>(endpoint);
  }
  
  /**
   * Get trending tutorials
   */
  async getTrendingTutorials(): Promise<Tutorial[]> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // GET /tutorials/trending will return array of trending tutorial documents
    const endpoint = AppConfig.api.endpoints.tutorials.trending;
    return apiClient.request<Tutorial[]>(endpoint);
  }
  
  /**
   * Get a specific tutorial by ID
   */
  async getTutorial(id: number): Promise<Tutorial> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // GET /tutorials/{id} will return MongoDB tutorial document
    const endpoint = AppConfig.api.endpoints.tutorials.detail(id);
    return apiClient.request<Tutorial>(endpoint);
  }
  
  /**
   * Create a new tutorial
   */
  async createTutorial(tutorial: Omit<Tutorial, 'id'>): Promise<Tutorial> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // POST /tutorials will create new MongoDB tutorial document
    const endpoint = AppConfig.api.endpoints.tutorials.create;
    return apiClient.request<Tutorial>(endpoint, {
      method: 'POST',
      body: tutorial,
    });
  }
  
  /**
   * Update an existing tutorial
   */
  async updateTutorial(id: number, tutorial: Partial<Tutorial>): Promise<Tutorial> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // PUT /tutorials/{id} will update MongoDB tutorial document
    const endpoint = AppConfig.api.endpoints.tutorials.update(id);
    return apiClient.request<Tutorial>(endpoint, {
      method: 'PUT',
      body: tutorial,
    });
  }
  
  /**
   * Delete a tutorial
   */
  async deleteTutorial(id: number): Promise<void> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // DELETE /tutorials/{id} will remove MongoDB tutorial document
    const endpoint = AppConfig.api.endpoints.tutorials.delete(id);
    await apiClient.request(endpoint, {
      method: 'DELETE',
    });
  }
  
  /**
   * Like a tutorial
   */
  async likeTutorial(id: number): Promise<void> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // POST /tutorials/{id}/like will increment likes count in MongoDB
    const endpoint = AppConfig.api.endpoints.tutorials.like(id);
    await apiClient.request(endpoint, {
      method: 'POST',
    });
  }
  
  /**
   * Unlike a previously liked tutorial
   */
  async unlikeTutorial(id: number): Promise<void> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // POST /tutorials/{id}/unlike will decrement likes count in MongoDB
    const endpoint = AppConfig.api.endpoints.tutorials.unlike(id);
    await apiClient.request(endpoint, {
      method: 'POST',
    });
  }
  
  /**
   * Rate a tutorial (1-5 stars)
   */
  async rateTutorial(id: number, rating: number): Promise<void> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // POST /tutorials/{id}/rate will store rating in MongoDB
    const endpoint = AppConfig.api.endpoints.tutorials.rate(id);
    await apiClient.request<TutorialRating>(endpoint, {
      method: 'POST',
      body: { rating },
    });
  }
  
  /**
   * Get comments for a tutorial
   */
  async getComments(tutorialId: number): Promise<Comment[]> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // GET /tutorials/{id}/comments will return array of MongoDB comment documents
    const endpoint = AppConfig.api.endpoints.tutorials.comments(tutorialId);
    return apiClient.request<Comment[]>(endpoint);
  }
  
  /**
   * Add a comment to a tutorial
   */
  async addComment(tutorialId: number, comment: string): Promise<Comment> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // POST /tutorials/{id}/comments will create new MongoDB comment document
    const endpoint = AppConfig.api.endpoints.tutorials.comments(tutorialId);
    return apiClient.request<Comment>(endpoint, {
      method: 'POST',
      body: { comment },
    });
  }
}

export const tutorialService = new TutorialService();
