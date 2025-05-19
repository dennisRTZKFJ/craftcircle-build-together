
import { apiClient } from './api';
import { AppConfig } from '@/config/app.config';

/**
 * Project service for managing DIY projects
 * Integrates with Spring Boot project endpoints and MongoDB
 */

export interface Project {
  id: number;            // Converted from MongoDB _id
  name: string;
  description?: string;
  status: 'planned' | 'in-progress' | 'completed' | 'abandoned' | 'new';
  createdAt?: string;    // MongoDB timestamp
  updatedAt?: string;    // MongoDB timestamp
  materials?: Material[];
  steps?: ProjectStep[];
  image?: string;
}

export interface Material {
  id: number;            // Converted from MongoDB _id
  name: string;
  quantity: number;
  unit: string;
  acquired: boolean;
}

export interface ProjectStep {
  id: number;            // Converted from MongoDB _id
  title: string;
  description: string;
  completed: boolean;
  imageUrl?: string;
}

class ProjectService {
  /**
   * Get all projects for the current user
   */
  async getProjects(): Promise<Project[]> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // GET /projects will return array of MongoDB project documents
    const endpoint = AppConfig.api.endpoints.projects.list;
    return apiClient.request<Project[]>(endpoint);
  }
  
  /**
   * Get a specific project by ID
   */
  async getProject(id: number): Promise<Project> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // GET /projects/{id} will return MongoDB project document
    const endpoint = AppConfig.api.endpoints.projects.detail(id);
    return apiClient.request<Project>(endpoint);
  }
  
  /**
   * Create a new project
   */
  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // POST /projects will create new MongoDB project document
    const endpoint = AppConfig.api.endpoints.projects.create;
    return apiClient.request<Project>(endpoint, {
      method: 'POST',
      body: project,
    });
  }
  
  /**
   * Update an existing project
   */
  async updateProject(id: number, project: Partial<Project>): Promise<Project> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // PUT /projects/{id} will update MongoDB project document
    const endpoint = AppConfig.api.endpoints.projects.update(id);
    return apiClient.request<Project>(endpoint, {
      method: 'PUT',
      body: project,
    });
  }
  
  /**
   * Delete a project
   */
  async deleteProject(id: number): Promise<void> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // DELETE /projects/{id} will remove MongoDB project document
    const endpoint = AppConfig.api.endpoints.projects.delete(id);
    await apiClient.request(endpoint, {
      method: 'DELETE',
    });
  }
  
  /**
   * Add material to a project
   */
  async addMaterial(projectId: number, material: Omit<Material, 'id'>): Promise<Material> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // POST /projects/{id}/materials will add material to MongoDB project document
    const endpoint = AppConfig.api.endpoints.projects.materials(projectId);
    return apiClient.request<Material>(endpoint, {
      method: 'POST',
      body: material,
    });
  }
  
  /**
   * Update project step status
   */
  async updateStepStatus(projectId: number, stepId: number, completed: boolean): Promise<ProjectStep> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // PATCH /projects/{id}/steps/{stepId} will update step status in MongoDB
    const endpoint = `${AppConfig.api.endpoints.projects.steps(projectId)}/${stepId}`;
    return apiClient.request<ProjectStep>(endpoint, {
      method: 'PATCH',
      body: { completed },
    });
  }
}

export const projectService = new ProjectService();
