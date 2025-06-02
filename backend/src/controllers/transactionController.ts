
/**
 * Transaction Controller
 * 
 * Handles financial transactions, payments, and subscription management.
 */

import { Request, Response } from 'express';
import Transaction from '@/models/Transaction';
import { ApiResponse, AuthenticatedRequest } from '@/types';
import { logger } from '@/utils/logger';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get user's transaction history with pagination
 * GET /api/transactions
 */
export const getTransactions = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      page = '1',
      limit = '10',
      type,
      status
    } = req.query as any;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build filter for user's transactions
    const filter: any = { user: req.userId };
    
    if (type) {
      filter.transactionType = type;
    }
    
    if (status) {
      filter.status = status;
    }

    const [transactions, total] = await Promise.all([
      Transaction.find(filter)
        .sort({ transactionDate: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Transaction.countDocuments(filter)
    ]);

    const response: ApiResponse = {
      success: true,
      message: 'Transactions retrieved successfully',
      data: transactions,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };

    res.json(response);

  } catch (error) {
    logger.error('Get transactions error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve transactions',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get single transaction by ID
 * GET /api/transactions/:id
 */
export const getTransactionById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      _id: id,
      user: req.userId // Ensure user can only access their own transactions
    }).lean();

    if (!transaction) {
      const response: ApiResponse = {
        success: false,
        message: 'Transaction not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Transaction retrieved successfully',
      data: transaction
    };

    res.json(response);

  } catch (error) {
    logger.error('Get transaction error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve transaction',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Create new transaction
 * POST /api/transactions
 */
export const createTransaction = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const transactionData = {
      ...req.body,
      user: req.userId,
      transactionId: `txn_${uuidv4()}`, // Generate unique transaction ID
      transactionDate: new Date()
    };

    const transaction = new Transaction(transactionData);
    await transaction.save();

    const response: ApiResponse = {
      success: true,
      message: 'Transaction created successfully',
      data: transaction
    };

    res.status(201).json(response);

  } catch (error) {
    logger.error('Create transaction error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to create transaction',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Update transaction status (admin only)
 * PUT /api/transactions/:id/status
 */
export const updateTransactionStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!transaction) {
      const response: ApiResponse = {
        success: false,
        message: 'Transaction not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Transaction status updated successfully',
      data: transaction
    };

    res.json(response);

  } catch (error) {
    logger.error('Update transaction status error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to update transaction status',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get transaction statistics (admin only)
 * GET /api/transactions/stats/overview
 */
export const getTransactionStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Get various transaction statistics
    const [
      totalTransactions,
      completedTransactions,
      totalRevenue,
      monthlyRevenue,
      transactionsByType
    ] = await Promise.all([
      Transaction.countDocuments(),
      Transaction.countDocuments({ status: 'COMPLETED' }),
      Transaction.aggregate([
        { $match: { status: 'COMPLETED' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ]),
      Transaction.aggregate([
        {
          $match: {
            status: 'COMPLETED',
            transactionDate: {
              $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ]),
      Transaction.aggregate([
        { $group: { _id: '$transactionType', count: { $sum: 1 } } }
      ])
    ]);

    const stats = {
      totalTransactions,
      completedTransactions,
      totalRevenue: totalRevenue[0]?.total || 0,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
      transactionsByType: transactionsByType.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    };

    const response: ApiResponse = {
      success: true,
      message: 'Transaction statistics retrieved successfully',
      data: stats
    };

    res.json(response);

  } catch (error) {
    logger.error('Get transaction stats error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve transaction statistics',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};
