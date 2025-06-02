
/**
 * Admin Routes
 * 
 * Handles admin dashboard and moderation tools.
 */

import express from 'express';
import {
  getAllUsers,
  updateUserStatus,
  getPendingTutorials,
  approveTutorial,
  getSystemStats
} from '@/controllers/adminController';
import { authenticateToken, requireRole } from '@/middlewares/auth';

const router = express.Router();

router.get('/users', [authenticateToken(), requireRole('admin')], getAllUsers);
router.put('/users/:id/status', [authenticateToken(), requireRole('admin')], updateUserStatus);
router.get('/tutorials/pending', [authenticateToken(), requireRole('admin')], getPendingTutorials);
router.put('/tutorials/:id/approve', [authenticateToken(), requireRole('admin')], approveTutorial);
router.get('/stats', [authenticateToken(), requireRole('admin')], getSystemStats);

export default router;
