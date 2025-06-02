
/**
 * Notification Routes
 * 
 * Handles user notifications and messaging.
 */

import express from 'express';
import {
  getNotifications,
  markAsRead,
  markAllAsRead
} from '@/controllers/notificationController';
import { authenticateToken } from '@/middlewares/auth';

const router = express.Router();

router.get('/', authenticateToken(), getNotifications);
router.put('/:id/read', authenticateToken(), markAsRead);
router.put('/read-all', authenticateToken(), markAllAsRead);

export default router;
