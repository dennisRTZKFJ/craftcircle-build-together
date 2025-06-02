
/**
 * User Controller
 * 
 * Handles user profile management, settings, and user-related operations.
 */

import { Request, Response } from 'express';
import User from '@/models/User';
import Tutorial from '@/models/Tutorial';
import { ApiResponse, AuthenticatedRequest } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Get current user profile
 * GET /api/users/me
 */
export const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      const response: ApiResponse = {
        success: false,
        message: 'User not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'User profile retrieved successfully',
      data: req.user.toJSON()
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
    const { name, bio, location, website, socialLinks } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        ...(name && { name }),
        ...(bio && { bio }),
        ...(location && { location }),
        ...(website && { website }),
        ...(socialLinks && { socialLinks }),
        updatedAt: new Date()
      },
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
      message: 'Profile updated successfully',
      data: user.toJSON()
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
    const user = await User.findById(req.userId).select('preferences');

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
      data: { preferences: user.preferences }
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
      { 
        $set: { 
          preferences: { ...preferences },
          updatedAt: new Date()
        }
      },
      { new: true }
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
      data: { preferences: user.preferences }
    };

    res.json(response);

  } catch (error) {
    logger.error('Update user settings error:', error);
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
    // Mock implementation - in real app would handle file upload
    const avatarUrl = '/uploads/avatars/default-avatar.png';

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
      message: 'Avatar uploaded successfully',
      data: { avatarUrl }
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
    const user = await User.findById(req.userId).select('stats');

    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'User not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'User statistics retrieved successfully',
      data: user.stats
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
    // Mock implementation - would query Project model
    const response: ApiResponse = {
      success: true,
      message: 'User projects retrieved successfully',
      data: []
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
    const tutorials = await Tutorial.find({ author: req.userId })
      .sort({ createdAt: -1 })
      .select('title description status stats createdAt')
      .lean();

    const response: ApiResponse = {
      success: true,
      message: 'User tutorials retrieved successfully',
      data: tutorials
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
