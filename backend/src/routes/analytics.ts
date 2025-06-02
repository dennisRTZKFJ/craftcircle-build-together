
/**
 * Analytics Routes
 * 
 * Handles creator analytics and insights.
 */

import express from 'express';
import {
  getAnalyticsOverview,
  getTutorialAnalytics,
  getRevenueAnalytics,
  getAudienceAnalytics
} from '@/controllers/analyticsController';
import { authenticateToken, requireRole } from '@/middlewares/auth';

const router = express.Router();

router.get('/overview', [authenticateToken(), requireRole('creator', 'admin')], getAnalyticsOverview);
router.get('/tutorials', [authenticateToken(), requireRole('creator', 'admin')], getTutorialAnalytics);
router.get('/revenue', [authenticateToken(), requireRole('creator', 'admin')], getRevenueAnalytics);
router.get('/audience', [authenticateToken(), requireRole('creator', 'admin')], getAudienceAnalytics);

export default router;
