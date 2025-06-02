
/**
 * Video Routes
 * 
 * Handles video content management for tutorials and projects.
 */

import express from 'express';
import { body, query } from 'express-validator';
import {
  getVideos,
  getVideoById,
  uploadVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  getVideoStats
} from '@/controllers/videoController';
import { authenticateToken, requireRole } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validation';

const router = express.Router();

/**
 * GET /api/videos
 * Get videos with filtering and pagination
 */
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('uploader').optional().isMongoId(),
  query('project').optional().isMongoId(),
  query('tutorial').optional().isMongoId(),
  validateRequest
], getVideos);

/**
 * GET /api/videos/:id
 * Get single video by ID
 */
router.get('/:id', getVideoById);

/**
 * POST /api/videos
 * Upload new video
 */
router.post('/', [
  authenticateToken(),
  body('title').trim().isLength({ min: 3, max: 200 }),
  body('url').isURL(),
  body('description').trim().isLength({ min: 10, max: 1000 }),
  body('thumbnail').isURL(),
  body('duration').isInt({ min: 1 }),
  body('associatedProject').optional().isMongoId(),
  body('associatedTutorial').optional().isMongoId(),
  validateRequest
], uploadVideo);

/**
 * PUT /api/videos/:id
 * Update video
 */
router.put('/:id', [
  authenticateToken(),
  body('title').optional().trim().isLength({ min: 3, max: 200 }),
  body('description').optional().trim().isLength({ min: 10, max: 1000 }),
  body('thumbnail').optional().isURL(),
  validateRequest
], updateVideo);

/**
 * DELETE /api/videos/:id
 * Delete video
 */
router.delete('/:id', authenticateToken(), deleteVideo);

/**
 * POST /api/videos/:id/like
 * Like/unlike video
 */
router.post('/:id/like', authenticateToken(), likeVideo);

/**
 * GET /api/videos/:id/stats
 * Get video statistics (creator/admin only)
 */
router.get('/:id/stats', [
  authenticateToken(),
  requireRole('creator', 'admin')
], getVideoStats);

export default router;
