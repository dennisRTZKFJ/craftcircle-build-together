
/**
 * Project Routes
 * 
 * Handles user project management including CRUD operations,
 * progress tracking, and project sharing.
 */

import express from 'express';
import { body, query } from 'express-validator';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  updateProjectProgress,
  shareProject
} from '@/controllers/projectController';
import { authenticateToken, requireOwnershipOrAdmin } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validation';

const router = express.Router();

/**
 * GET /api/projects
 * Get user's projects with filtering
 */
router.get('/', [
  authenticateToken(),
  query('status').optional().isIn(['planning', 'in_progress', 'completed', 'on_hold']),
  query('category').optional().isString(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  validateRequest
], getProjects);

/**
 * GET /api/projects/:id
 * Get single project by ID
 */
router.get('/:id', [
  authenticateToken(),
  requireOwnershipOrAdmin((req) => req.params.id)
], getProjectById);

/**
 * POST /api/projects
 * Create new project
 */
router.post('/', [
  authenticateToken(),
  body('title').trim().isLength({ min: 3, max: 200 }),
  body('description').trim().isLength({ min: 10, max: 1000 }),
  body('difficulty').isIn(['beginner', 'intermediate', 'advanced']),
  body('category').notEmpty(),
  body('tutorial').optional().isMongoId(),
  validateRequest
], createProject);

/**
 * PUT /api/projects/:id
 * Update project
 */
router.put('/:id', [
  authenticateToken(),
  requireOwnershipOrAdmin((req) => req.params.id),
  body('title').optional().trim().isLength({ min: 3, max: 200 }),
  body('description').optional().trim().isLength({ min: 10, max: 1000 }),
  body('status').optional().isIn(['planning', 'in_progress', 'completed', 'on_hold']),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']),
  validateRequest
], updateProject);

/**
 * DELETE /api/projects/:id
 * Delete project
 */
router.delete('/:id', [
  authenticateToken(),
  requireOwnershipOrAdmin((req) => req.params.id)
], deleteProject);

/**
 * PUT /api/projects/:id/progress
 * Update project progress
 */
router.put('/:id/progress', [
  authenticateToken(),
  requireOwnershipOrAdmin((req) => req.params.id),
  body('currentStep').isInt({ min: 0 }),
  body('completedSteps').isArray(),
  body('percentage').isFloat({ min: 0, max: 100 }),
  validateRequest
], updateProjectProgress);

/**
 * POST /api/projects/:id/share
 * Share project publicly
 */
router.post('/:id/share', [
  authenticateToken(),
  requireOwnershipOrAdmin((req) => req.params.id)
], shareProject);

export default router;
