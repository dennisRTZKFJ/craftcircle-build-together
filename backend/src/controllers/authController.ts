
/**
 * Authentication Controller
 * 
 * Handles user authentication including registration, login, logout,
 * password reset, and email verification.
 */

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import Subscription from '@/models/Subscription';
import { ApiResponse, AuthenticatedRequest } from '@/types';
import { logger } from '@/utils/logger';
import { sendEmail } from '@/services/emailService';
import { createNotification } from './notificationController';

/**
 * Generate JWT tokens for user
 */
const generateTokens = (userId: string) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );

  return { accessToken, refreshToken };
};

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const response: ApiResponse = {
        success: false,
        message: 'User already exists with this email'
      };
      return res.status(400).json(response);
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role,
      preferences: {
        emailNotifications: true,
        browserNotifications: true,
        marketingEmails: false,
        showProfile: true,
        showProjects: true
      },
      stats: {
        tutorialsCreated: 0,
        projectsCompleted: 0,
        totalViews: 0,
        totalEarnings: 0
      }
    });

    await user.save();

    // Create default free subscription
    const subscription = new Subscription({
      user: user._id,
      type: 'FREE',
      startDate: new Date(),
      isActive: true,
      price: 0
    });
    await subscription.save();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    // Send welcome email
    try {
      await sendEmail({
        to: email,
        subject: 'Welcome to CraftCircle!',
        template: 'welcome',
        data: { name, email }
      });
    } catch (emailError) {
      logger.error('Welcome email failed:', emailError);
      // Don't fail registration if email fails
    }

    // Create welcome notification
    await createNotification(
      user._id.toString(),
      'system',
      'Welcome to CraftCircle!',
      'Start your DIY journey by exploring tutorials and creating your first project.',
      { isWelcome: true },
      '/tutorials'
    );

    const response: ApiResponse = {
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toJSON(),
        tokens: { accessToken, refreshToken }
      }
    };

    res.status(201).json(response);

  } catch (error) {
    logger.error('Registration error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Registration failed',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid email or password'
      };
      return res.status(401).json(response);
    }

    // Check if user account is active
    if (!user.isActive) {
      const response: ApiResponse = {
        success: false,
        message: 'Account has been deactivated'
      };
      return res.status(401).json(response);
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid email or password'
      };
      return res.status(401).json(response);
    }

    // Update last login timestamp
    user.lastLoginAt = new Date();
    await user.save();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    const response: ApiResponse = {
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        tokens: { accessToken, refreshToken }
      }
    };

    res.json(response);

  } catch (error) {
    logger.error('Login error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Login failed',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Logout user
 * POST /api/auth/logout
 */
export const logout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // In a production app, you might want to blacklist the token
    // For now, we'll just return success as the client will remove the token
    
    const response: ApiResponse = {
      success: true,
      message: 'Logout successful'
    };

    res.json(response);

  } catch (error) {
    logger.error('Logout error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Logout failed',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Refresh access token
 * POST /api/auth/refresh-token
 */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      const response: ApiResponse = {
        success: false,
        message: 'Refresh token is required'
      };
      return res.status(401).json(response);
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid refresh token'
      };
      return res.status(401).json(response);
    }

    // Generate new tokens
    const tokens = generateTokens(user._id.toString());

    const response: ApiResponse = {
      success: true,
      message: 'Token refreshed successfully',
      data: { tokens }
    };

    res.json(response);

  } catch (error) {
    logger.error('Refresh token error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Invalid refresh token'
    };
    res.status(401).json(response);
  }
};

/**
 * Request password reset
 * POST /api/auth/reset-password
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if email exists or not for security
      const response: ApiResponse = {
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent'
      };
      return res.json(response);
    }

    // Generate reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save();

    // Send reset email
    try {
      await sendEmail({
        to: email,
        subject: 'Password Reset Request',
        template: 'password-reset',
        data: { 
          name: user.name, 
          resetToken,
          resetUrl: `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`
        }
      });
    } catch (emailError) {
      logger.error('Password reset email failed:', emailError);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      
      const response: ApiResponse = {
        success: false,
        message: 'Failed to send password reset email'
      };
      return res.status(500).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Password reset link has been sent to your email'
    };

    res.json(response);

  } catch (error) {
    logger.error('Reset password error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Password reset failed',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Update password using reset token
 * PUT /api/auth/update-password
 */
export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    // Find user with valid reset token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() }
    });

    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid or expired reset token'
      };
      return res.status(400).json(response);
    }

    // Update password and clear reset token
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const response: ApiResponse = {
      success: true,
      message: 'Password updated successfully'
    };

    res.json(response);

  } catch (error) {
    logger.error('Update password error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Password update failed',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Verify email address
 * GET /api/auth/verify-email/:token
 */
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    // In a real implementation, you'd have an email verification token system
    // For now, we'll just mark any user with this token pattern as verified
    const user = await User.findById(token);
    
    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid verification token'
      };
      return res.status(400).json(response);
    }

    user.isVerified = true;
    await user.save();

    const response: ApiResponse = {
      success: true,
      message: 'Email verified successfully'
    };

    res.json(response);

  } catch (error) {
    logger.error('Email verification error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Email verification failed',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};
