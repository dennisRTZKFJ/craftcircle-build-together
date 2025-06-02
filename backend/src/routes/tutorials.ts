
/**
 * Tutorial Routes
 * 
 * Handles all tutorial-related endpoints including CRUD operations,
 * search, filtering, rating, and social interactions.
 */

import express from 'express';
import { body, query } from 'express-validator';
import {
  getTutorials,
  getTutorialById,
  createTutorial,
  updateTutorial,
  deleteTutorial,
  likeTutorial,
  rateTutorial,
  getFeaturedTutorials,
  getTrendingTutorials,
  getTutorialComments,
  addTutorialComment
} from '@/controllers/tutorialController';
import { authenticateToken, requireRole, requireOwnershipOrAdmin } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validation';

const router = express.Router();

/**
 * GET /api/tutorials
 * Get paginated list of tutorials with search and filtering
 */
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('category').optional().isString(),
  query('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']),
  query('tags').optional().isString(),
  query('q').optional().isString(),
  validateRequest
], getTutorials);

/**
 * GET /api/tutorials/featured
 * Get featured tutorials
 */
router.get('/featured', getFeaturedTutorials);

/**
 * GET /api/tutorials/trending
 * Get trending tutorials
 */
router.get('/trending', getTrendingTutorials);

/**
 * GET /api/tutorials/:id
 * Get single tutorial by ID
 */
router.get('/:id', getTutorialById);

/**
 * GET /api/tutorials/:id/comments
 * Get tutorial comments
 */
router.get('/:id/comments', getTutorialComments);

/**
 * POST /api/tutorials
 * Create new tutorial (creators and admins only)
 */
router.post('/', [
  authenticateToken(),
  requireRole('creator', 'admin'),
  body('title').trim().isLength({ min: 5, max: 200 }),
  body('description').trim().isLength({ min: 20, max: 1000 }),
  body('content').notEmpty(),
  body('category').isIn([
    'woodworking', 'furniture', 'tools', 'upcycling', 'gardening',
    'electronics', 'textiles', 'metalworking', 'ceramics', 'jewelry',
    'home_improvement', 'storage', 'lighting', 'decoration', 'repairs'
  ]),
  body('difficulty').isIn(['beginner', 'intermediate', 'advanced']),
  body('duration').isInt({ min: 5 }),
  body('thumbnail').notEmpty(),
  validateRequest
], createTutorial);

/**
 * PUT /api/tutorials/:id
 * Update tutorial (owner or admin only)
 */
router.put('/:id', [
  authenticateToken(),
  requireOwnershipOrAdmin((req) => req.body.authorId),
  body('title').optional().trim().isLength({ min: 5, max: 200 }),
  body('description').optional().trim().isLength({ min: 20, max: 1000 }),
  body('category').optional().isIn([
    'woodworking', 'furniture', 'tools', 'upcycling', 'gardening',
    'electronics', 'textiles', 'metalworking', 'ceramics', 'jewelry',
    'home_improvement', 'storage', 'lighting', 'decoration', 'repairs'
  ]),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']),
  validateRequest
], updateTutorial);

/**
 * DELETE /api/tutorials/:id
 * Delete tutorial (owner or admin only)
 */
router.delete('/:id', [
  authenticateToken(),
  requireOwnershipOrAdmin((req) => req.body.authorId)
], deleteTutorial);

/**
 * POST /api/tutorials/:id/like
 * Like or unlike tutorial
 */
router.post('/:id/like', authenticateToken(), likeTutorial);

/**
 * POST /api/tutorials/:id/rate
 * Rate tutorial (1-5 stars)
 */
router.post('/:id/rate', [
  authenticateToken(),
  body('rating').isInt({ min: 1, max: 5 }),
  validateRequest
], rateTutorial);

/**
 * POST /api/tutorials/:id/comments
 * Add comment to tutorial
 */
router.post('/:id/comments', [
  authenticateToken(),
  body('content').trim().isLength({ min: 1, max: 1000 }),
  validateRequest
], addTutorialComment);

export default router;
