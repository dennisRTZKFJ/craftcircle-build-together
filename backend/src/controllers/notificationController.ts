
/**
 * Notification Controller
 * 
 * Handles user notifications and messaging system.
 */

import { Request, Response } from 'express';
import Notification from '@/models/Notification';
import { ApiResponse, AuthenticatedRequest } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Get user's notifications with pagination
 * GET /api/notifications
 */
export const getNotifications = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      page = '1',
      limit = '20',
      unreadOnly = 'false'
    } = req.query as any;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter: any = { user: req.userId };
    
    if (unreadOnly === 'true') {
      filter.isRead = false;
    }

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Notification.countDocuments(filter),
      Notification.countDocuments({ user: req.userId, isRead: false })
    ]);

    const response: ApiResponse = {
      success: true,
      message: 'Notifications retrieved successfully',
      data: {
        notifications,
        unreadCount
      },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };

    res.json(response);

  } catch (error) {
    logger.error('Get notifications error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve notifications',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Mark notification as read
 * PUT /api/notifications/:id/read
 */
export const markAsRead = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: req.userId },
      { isRead: true, updatedAt: new Date() },
      { new: true }
    );

    if (!notification) {
      const response: ApiResponse = {
        success: false,
        message: 'Notification not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Notification marked as read',
      data: notification
    };

    res.json(response);

  } catch (error) {
    logger.error('Mark notification as read error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to mark notification as read',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Mark all notifications as read
 * PUT /api/notifications/read-all
 */
export const markAllAsRead = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await Notification.updateMany(
      { user: req.userId, isRead: false },
      { isRead: true, updatedAt: new Date() }
    );

    const response: ApiResponse = {
      success: true,
      message: `Marked ${result.modifiedCount} notifications as read`,
      data: { modifiedCount: result.modifiedCount }
    };

    res.json(response);

  } catch (error) {
    logger.error('Mark all notifications as read error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to mark all notifications as read',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Create a new notification (internal service function)
 * This is typically called by other services, not directly via API
 */
export const createNotification = async (
  userId: string,
  type: string,
  title: string,
  message: string,
  data?: any,
  actionUrl?: string
) => {
  try {
    const notification = new Notification({
      user: userId,
      type,
      title,
      message,
      data,
      actionUrl
    });

    await notification.save();
    logger.info(`Notification created for user ${userId}: ${title}`);
    return notification;

  } catch (error) {
    logger.error('Create notification error:', error);
    throw error;
  }
};
