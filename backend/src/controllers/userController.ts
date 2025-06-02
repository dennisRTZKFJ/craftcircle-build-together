
/**
 * User Controller
 * 
 * Handles user profile management, settings, and user-related operations.
 */

import { Request, Response } from 'express';
import User from '@/models/User';
import Project from '@/models/Project';
import Tutorial from '@/models/Tutorial';
import Subscription from '@/models/Subscription';
import ContentCreator from '@/models/ContentCreator';
import { ApiResponse, AuthenticatedRequest } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Get current user profile
 * GET /api/users/me
 */
export const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId)
      .populate({
        path: 'subscription',
        model: Subscription
      })
      .lean();

    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'User not found'
      };
      return res.status(404).json(response);
    }

    // Get subscription info
    const subscription = await Subscription.findOne({ user: req.userId }).lean();

    // Get creator profile if user is a creator
    let creatorProfile = null;
    if (user.role === 'creator') {
      creatorProfile = await ContentCreator.findOne({ user: req.userId }).lean();
    }

    const response: ApiResponse = {
      success: true,
      message: 'User profile retrieved successfully',
      data: {
        ...user,
        subscription,
        creatorProfile
      }
    };

    res.json(response);

  } catch (error) {
    logger.error('Get current user error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve user profile',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Update user profile
 * PUT /api/users/me
 */
export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const allowedUpdates = [
      'name', 'bio', 'location', 'website', 'socialLinks'
    ];
    
    const updates: any = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.userId,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'User not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Profile updated successfully',
      data: user
    };

    res.json(response);

  } catch (error) {
    logger.error('Update profile error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to update profile',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get user settings
 * GET /api/users/me/settings
 */
export const getUserSettings = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId)
      .select('preferences')
      .lean();

    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'User not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'User settings retrieved successfully',
      data: user.preferences
    };

    res.json(response);

  } catch (error) {
    logger.error('Get user settings error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve user settings',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Update user settings
 * PUT /api/users/me/settings
 */
export const updateUserSettings = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { preferences, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('preferences');

    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'User not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Settings updated successfully',
      data: user.preferences
    };

    res.json(response);

  } catch (error) {
    logger.error('Update settings error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to update settings',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Upload user avatar
 * POST /api/users/me/avatar
 */
export const uploadAvatar = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // In a real implementation, you'd handle file upload here
    // For now, we'll just accept an avatar URL from the request body
    const { avatarUrl } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { avatar: avatarUrl, updatedAt: new Date() },
      { new: true }
    );

    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'User not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Avatar updated successfully',
      data: { avatar: user.avatar }
    };

    res.json(response);

  } catch (error) {
    logger.error('Upload avatar error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to upload avatar',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get user statistics
 * GET /api/users/me/stats
 */
export const getUserStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const [user, projectsCount, tutorialsCount] = await Promise.all([
      User.findById(req.userId).select('stats').lean(),
      Project.countDocuments({ user: req.userId }),
      Tutorial.countDocuments({ author: req.userId })
    ]);

    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'User not found'
      };
      return res.status(404).json(response);
    }

    // Get additional statistics
    const [completedProjects, inProgressProjects] = await Promise.all([
      Project.countDocuments({ user: req.userId, status: 'COMPLETED' }),
      Project.countDocuments({ user: req.userId, status: 'IN_PROGRESS' })
    ]);

    const stats = {
      ...user.stats,
      totalProjects: projectsCount,
      completedProjects,
      inProgressProjects,
      totalTutorials: tutorialsCount
    };

    const response: ApiResponse = {
      success: true,
      message: 'User statistics retrieved successfully',
      data: stats
    };

    res.json(response);

  } catch (error) {
    logger.error('Get user stats error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve user statistics',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get user's projects
 * GET /api/users/me/projects
 */
export const getUserProjects = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      page = '1',
      limit = '12',
      status
    } = req.query as any;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter: any = { user: req.userId };
    
    if (status) {
      filter.status = status;
    }

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .populate('tutorial', 'title thumbnail')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Project.countDocuments(filter)
    ]);

    const response: ApiResponse = {
      success: true,
      message: 'User projects retrieved successfully',
      data: projects,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };

    res.json(response);

  } catch (error) {
    logger.error('Get user projects error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve user projects',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get user's tutorials (for creators)
 * GET /api/users/me/tutorials
 */
export const getUserTutorials = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      page = '1',
      limit = '12',
      status
    } = req.query as any;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter: any = { author: req.userId };
    
    if (status) {
      filter.status = status;
    }

    const [tutorials, total] = await Promise.all([
      Tutorial.find(filter)
        .select('title description thumbnail category difficulty status stats publishedAt createdAt')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Tutorial.countDocuments(filter)
    ]);

    const response: ApiResponse = {
      success: true,
      message: 'User tutorials retrieved successfully',
      data: tutorials,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };

    res.json(response);

  } catch (error) {
    logger.error('Get user tutorials error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve user tutorials',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};
