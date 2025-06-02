
/**
 * Subscription Routes
 * 
 * Handles premium subscriptions and payment processing.
 */

import express from 'express';
import {
  getCurrentSubscription,
  createSubscription,
  cancelSubscription,
  getPaymentMethods,
  addPaymentMethod
} from '@/controllers/subscriptionController';
import { authenticateToken } from '@/middlewares/auth';

const router = express.Router();

router.get('/current', authenticateToken(), getCurrentSubscription);
router.post('/', authenticateToken(), createSubscription);
router.delete('/cancel', authenticateToken(), cancelSubscription);
router.get('/payment-methods', authenticateToken(), getPaymentMethods);
router.post('/payment-methods', authenticateToken(), addPaymentMethod);

export default router;
