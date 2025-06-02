
/**
 * Payment Routes
 * 
 * Handles payment methods and Stripe integration.
 */

import express from 'express';
import { body } from 'express-validator';
import {
  getPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod
} from '@/controllers/paymentController';
import { authenticateToken } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validation';

const router = express.Router();

/**
 * GET /api/payments/methods
 * Get user's payment methods
 */
router.get('/methods', authenticateToken(), getPaymentMethods);

/**
 * POST /api/payments/methods
 * Add new payment method
 */
router.post('/methods', [
  authenticateToken(),
  body('stripeId').notEmpty().trim(),
  body('paymentMethod').notEmpty().trim(),
  body('automaticPaymentMethod').optional().isBoolean(),
  validateRequest
], addPaymentMethod);

/**
 * PUT /api/payments/methods/:id
 * Update payment method
 */
router.put('/methods/:id', [
  authenticateToken(),
  body('automaticPaymentMethod').optional().isBoolean(),
  validateRequest
], updatePaymentMethod);

/**
 * DELETE /api/payments/methods/:id
 * Delete payment method
 */
router.delete('/methods/:id', authenticateToken(), deletePaymentMethod);

/**
 * POST /api/payments/methods/:id/default
 * Set payment method as default
 */
router.post('/methods/:id/default', authenticateToken(), setDefaultPaymentMethod);

export default router;
