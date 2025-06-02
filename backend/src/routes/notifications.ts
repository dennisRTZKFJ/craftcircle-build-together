
/**
 * Notification Routes
 * 
 * Handles user notifications and messaging.
 */

import express from 'express';
import { query } from 'express-validator';
import {
  getNotifications,
  markAsRead,
  markAllAsRead
} from '@/controllers/notificationController';
import { authenticateToken } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validation';

const router = express.Router();

/**
 * GET /api/notifications
 * Get user's notifications with pagination
 */
router.get('/', [
  authenticateToken(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('unreadOnly').optional().isBoolean(),
  validateRequest
], getNotifications);

/**
 * PUT /api/notifications/:id/read
 * Mark single notification as read
 */
router.put('/:id/read', authenticateToken(), markAsRead);

/**
 * PUT /api/notifications/read-all
 * Mark all notifications as read
 */
router.put('/read-all', authenticateToken(), markAllAsRead);

export default router;
