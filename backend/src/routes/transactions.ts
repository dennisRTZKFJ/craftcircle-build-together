
/**
 * Transaction Routes
 * 
 * Handles financial transactions, payments, and subscription management.
 */

import express from 'express';
import { body, query } from 'express-validator';
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransactionStatus,
  getTransactionStats
} from '@/controllers/transactionController';
import { authenticateToken, requireRole } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validation';

const router = express.Router();

/**
 * GET /api/transactions
 * Get user's transaction history with pagination
 */
router.get('/', [
  authenticateToken(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('type').optional().isIn(['SUBSCRIPTION', 'PURCHASE']),
  query('status').optional().isIn(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED']),
  validateRequest
], getTransactions);

/**
 * GET /api/transactions/:id
 * Get single transaction by ID
 */
router.get('/:id', [
  authenticateToken()
], getTransactionById);

/**
 * POST /api/transactions
 * Create new transaction
 */
router.post('/', [
  authenticateToken(),
  body('totalPrice').isFloat({ min: 0 }),
  body('transactionType').isIn(['SUBSCRIPTION', 'PURCHASE']),
  body('paymentMethod').notEmpty().trim(),
  body('description').notEmpty().trim(),
  validateRequest
], createTransaction);

/**
 * PUT /api/transactions/:id/status
 * Update transaction status (admin only)
 */
router.put('/:id/status', [
  authenticateToken(),
  requireRole('admin'),
  body('status').isIn(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED']),
  validateRequest
], updateTransactionStatus);

/**
 * GET /api/transactions/stats/overview
 * Get transaction statistics (admin only)
 */
router.get('/stats/overview', [
  authenticateToken(),
  requireRole('admin')
], getTransactionStats);

export default router;
