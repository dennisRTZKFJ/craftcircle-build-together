
/**
 * Subscription Controller
 * 
 * Handles premium subscriptions and payment processing.
 * Manages user subscription lifecycle including creation, cancellation, and billing.
 */

import { Request, Response } from 'express';
import Subscription from '@/models/Subscription';
import PaymentInformation from '@/models/PaymentInformation';
import Transaction from '@/models/Transaction';
import { ApiResponse, AuthenticatedRequest } from '@/types';
import { logger } from '@/utils/logger';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get current user's subscription
 * GET /api/subscriptions/current
 */
export const getCurrentSubscription = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const subscription = await Subscription.findOne({ user: req.userId })
      .populate('user', 'name email')
      .lean();

    if (!subscription) {
      // Create default free subscription if none exists
      const newSubscription = new Subscription({
        user: req.userId,
        type: 'FREE',
        isActive: true,
        price: 0
      });
      await newSubscription.save();
      
      const response: ApiResponse = {
        success: true,
        message: 'Default subscription created',
        data: newSubscription
      };
      return res.json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Subscription retrieved successfully',
      data: subscription
    };

    res.json(response);

  } catch (error) {
    logger.error('Get current subscription error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve subscription',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Create new subscription (upgrade to premium)
 * POST /api/subscriptions
 */
export const createSubscription = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { type, paymentMethodId } = req.body;

    // Validate subscription type
    if (type !== 'YEARLY') {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid subscription type'
      };
      return res.status(400).json(response);
    }

    // Check if user has valid payment method
    const paymentMethod = await PaymentInformation.findOne({
      _id: paymentMethodId,
      user: req.userId,
      statusFromStripe: 'active'
    });

    if (!paymentMethod) {
      const response: ApiResponse = {
        success: false,
        message: 'Valid payment method required'
      };
      return res.status(400).json(response);
    }

    // Calculate subscription dates
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1); // Add 1 year

    const nextPaymentDate = new Date(endDate);

    // Update or create subscription
    const subscriptionData = {
      user: req.userId,
      type: 'YEARLY',
      startDate,
      endDate,
      isActive: true,
      price: 99.99, // Yearly subscription price
      nextPaymentDate
    };

    const subscription = await Subscription.findOneAndUpdate(
      { user: req.userId },
      subscriptionData,
      { new: true, upsert: true }
    );

    // Create transaction record
    const transaction = new Transaction({
      user: req.userId,
      transactionId: `sub_${uuidv4()}`,
      transactionDate: new Date(),
      totalPrice: 99.99,
      transactionType: 'SUBSCRIPTION',
      status: 'COMPLETED',
      paymentMethod: paymentMethod.paymentMethod,
      description: 'Yearly subscription purchase'
    });
    await transaction.save();

    const response: ApiResponse = {
      success: true,
      message: 'Subscription created successfully',
      data: { subscription, transaction }
    };

    res.status(201).json(response);

  } catch (error) {
    logger.error('Create subscription error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to create subscription',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Cancel subscription
 * DELETE /api/subscriptions/cancel
 */
export const cancelSubscription = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { user: req.userId, isActive: true },
      { 
        isActive: false,
        endDate: new Date(), // End immediately
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!subscription) {
      const response: ApiResponse = {
        success: false,
        message: 'No active subscription found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Subscription cancelled successfully',
      data: subscription
    };

    res.json(response);

  } catch (error) {
    logger.error('Cancel subscription error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to cancel subscription',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get user's payment methods
 * GET /api/subscriptions/payment-methods
 */
export const getPaymentMethods = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const paymentMethods = await PaymentInformation.find({ user: req.userId })
      .sort({ addedDate: -1 })
      .lean();

    const response: ApiResponse = {
      success: true,
      message: 'Payment methods retrieved successfully',
      data: paymentMethods
    };

    res.json(response);

  } catch (error) {
    logger.error('Get payment methods error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve payment methods',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Add new payment method
 * POST /api/subscriptions/payment-methods
 */
export const addPaymentMethod = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const paymentData = {
      ...req.body,
      user: req.userId,
      addedDate: new Date(),
      statusFromStripe: 'active'
    };

    const paymentMethod = new PaymentInformation(paymentData);
    await paymentMethod.save();

    const response: ApiResponse = {
      success: true,
      message: 'Payment method added successfully',
      data: paymentMethod
    };

    res.status(201).json(response);

  } catch (error) {
    logger.error('Add payment method error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to add payment method',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};
