
import { apiClient } from './api';

/**
 * Project service for managing DIY projects
 */

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: 'planned' | 'in-progress' | 'completed' | 'abandoned' | 'new';
  createdAt?: string;
  updatedAt?: string;
  materials?: Material[];
  steps?: ProjectStep[];
  image?: string;
}

export interface Material {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  acquired: boolean;
}

export interface ProjectStep {
  id: number;
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
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<Project[]>('/projects');
  }
  
  /**
   * Get a specific project by ID
   */
  async getProject(id: number): Promise<Project> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<Project>(`/projects/${id}`);
  }
  
  /**
   * Create a new project
   */
  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<Project>('/projects', {
      method: 'POST',
      body: project,
    });
  }
  
  /**
   * Update an existing project
   */
  async updateProject(id: number, project: Partial<Project>): Promise<Project> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: project,
    });
  }
  
  /**
   * Delete a project
   */
  async deleteProject(id: number): Promise<void> {
    // 🔧 INTEGRATION: Replace with real backend call
    await apiClient.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }
  
  /**
   * Add material to a project
   */
  async addMaterial(projectId: number, material: Omit<Material, 'id'>): Promise<Material> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<Material>(`/projects/${projectId}/materials`, {
      method: 'POST',
      body: material,
    });
  }
  
  /**
   * Update project step status
   */
  async updateStepStatus(projectId: number, stepId: number, completed: boolean): Promise<ProjectStep> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<ProjectStep>(`/projects/${projectId}/steps/${stepId}`, {
      method: 'PATCH',
      body: { completed },
    });
  }
}

export const projectService = new ProjectService();

