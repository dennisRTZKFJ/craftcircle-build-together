
/**
 * Partner Routes
 * 
 * Handles partner dashboard and business analytics.
 */

import express from 'express';
import {
  getPartnerStats,
  getPartnerProducts,
  getPartnerOrders,
  getPartnerAnalytics
} from '@/controllers/partnerController';
import { authenticateToken, requireRole } from '@/middlewares/auth';

const router = express.Router();

router.get('/stats', [authenticateToken(), requireRole('partner', 'admin')], getPartnerStats);
router.get('/products', [authenticateToken(), requireRole('partner', 'admin')], getPartnerProducts);
router.get('/orders', [authenticateToken(), requireRole('partner', 'admin')], getPartnerOrders);
router.get('/analytics', [authenticateToken(), requireRole('partner', 'admin')], getPartnerAnalytics);

export default router;
