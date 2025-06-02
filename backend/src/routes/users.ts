
/**
 * User Routes
 * 
 * Handles user profile management, settings, and user-related operations.
 */

import express from 'express';
import { body } from 'express-validator';
import {
  getCurrentUser,
  updateProfile,
  getUserSettings,
  updateUserSettings,
  uploadAvatar,
  getUserStats,
  getUserProjects,
  getUserTutorials
} from '@/controllers/userController';
import { authenticateToken } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validation';

const router = express.Router();

/**
 * GET /api/users/me
 * Get current user profile
 */
router.get('/me', authenticateToken(), getCurrentUser);

/**
 * PUT /api/users/me
 * Update current user profile
 */
router.put('/me', [
  authenticateToken(),
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('bio').optional().trim().isLength({ max: 500 }),
  body('location').optional().trim().isLength({ max: 100 }),
  body('website').optional().isURL(),
  body('socialLinks.instagram').optional().isURL(),
  body('socialLinks.youtube').optional().isURL(),
  body('socialLinks.tiktok').optional().isURL(),
  validateRequest
], updateProfile);

/**
 * GET /api/users/me/settings
 * Get user preferences and settings
 */
router.get('/me/settings', authenticateToken(), getUserSettings);

/**
 * PUT /api/users/me/settings
 * Update user preferences and settings
 */
router.put('/me/settings', [
  authenticateToken(),
  body('preferences.emailNotifications').optional().isBoolean(),
  body('preferences.browserNotifications').optional().isBoolean(),
  body('preferences.marketingEmails').optional().isBoolean(),
  body('preferences.showProfile').optional().isBoolean(),
  body('preferences.showProjects').optional().isBoolean(),
  validateRequest
], updateUserSettings);

/**
 * POST /api/users/me/avatar
 * Upload user avatar image
 */
router.post('/me/avatar', authenticateToken(), uploadAvatar);

/**
 * GET /api/users/me/stats
 * Get user statistics
 */
router.get('/me/stats', authenticateToken(), getUserStats);

/**
 * GET /api/users/me/projects
 * Get user's projects
 */
router.get('/me/projects', authenticateToken(), getUserProjects);

/**
 * GET /api/users/me/tutorials
 * Get user's tutorials (for creators)
 */
router.get('/me/tutorials', authenticateToken(), getUserTutorials);

export default router;
