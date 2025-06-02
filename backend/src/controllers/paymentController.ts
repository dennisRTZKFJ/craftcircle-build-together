
/**
 * Payment Controller
 * 
 * Handles payment methods and Stripe integration.
 */

import { Request, Response } from 'express';
import PaymentInformation from '@/models/PaymentInformation';
import { ApiResponse, AuthenticatedRequest } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Get user's payment methods
 * GET /api/payments/methods
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
 * POST /api/payments/methods
 */
export const addPaymentMethod = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const paymentData = {
      ...req.body,
      user: req.userId,
      addedDate: new Date(),
      statusFromStripe: 'active' // Default status
    };

    // If this is set as automatic payment method, disable others
    if (paymentData.automaticPaymentMethod) {
      await PaymentInformation.updateMany(
        { user: req.userId },
        { automaticPaymentMethod: false }
      );
    }

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

/**
 * Update payment method
 * PUT /api/payments/methods/:id
 */
export const updatePaymentMethod = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // If setting as automatic payment method, disable others
    if (req.body.automaticPaymentMethod) {
      await PaymentInformation.updateMany(
        { user: req.userId, _id: { $ne: id } },
        { automaticPaymentMethod: false }
      );
    }

    const paymentMethod = await PaymentInformation.findOneAndUpdate(
      { _id: id, user: req.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!paymentMethod) {
      const response: ApiResponse = {
        success: false,
        message: 'Payment method not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Payment method updated successfully',
      data: paymentMethod
    };

    res.json(response);

  } catch (error) {
    logger.error('Update payment method error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to update payment method',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Delete payment method
 * DELETE /api/payments/methods/:id
 */
export const deletePaymentMethod = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const paymentMethod = await PaymentInformation.findOneAndDelete({
      _id: id,
      user: req.userId
    });

    if (!paymentMethod) {
      const response: ApiResponse = {
        success: false,
        message: 'Payment method not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Payment method deleted successfully'
    };

    res.json(response);

  } catch (error) {
    logger.error('Delete payment method error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to delete payment method',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Set payment method as default
 * POST /api/payments/methods/:id/default
 */
export const setDefaultPaymentMethod = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Disable automatic payment for all other methods
    await PaymentInformation.updateMany(
      { user: req.userId },
      { automaticPaymentMethod: false }
    );

    // Set this method as default
    const paymentMethod = await PaymentInformation.findOneAndUpdate(
      { _id: id, user: req.userId },
      { automaticPaymentMethod: true, updatedAt: new Date() },
      { new: true }
    );

    if (!paymentMethod) {
      const response: ApiResponse = {
        success: false,
        message: 'Payment method not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Default payment method set successfully',
      data: paymentMethod
    };

    res.json(response);

  } catch (error) {
    logger.error('Set default payment method error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to set default payment method',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};
