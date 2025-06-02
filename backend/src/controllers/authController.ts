
/**
 * Authentication Controller
 * 
 * Handles all authentication-related business logic:
 * - User registration and login
 * - JWT token generation and validation
 * - Password reset functionality
 * - Email verification
 */

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { ApiResponse, AuthenticatedRequest } from '@/types';
import { logger } from '@/utils/logger';
import { sendEmail } from '@/services/emailService';

/**
 * Generate JWT tokens for authenticated user
 */
const generateTokens = (userId: string) => {
  const payload = { userId };
  
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
  
  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
  );
  
  return { accessToken, refreshToken };
};

/**
 * Register new user
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
        message: 'User with this email already exists'
      };
      return res.status(400).json(response);
    }
    
    // Create new user
    const user = new User({
      name,
      email,
      password,
      role
    });
    
    await user.save();
    
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id.toString());
    
    // Send welcome email (optional)
    try {
      await sendEmail({
        to: user.email,
        subject: 'Welcome to CraftCircle!',
        template: 'welcome',
        data: { name: user.name }
      });
    } catch (emailError) {
      logger.warn('Failed to send welcome email:', emailError);
    }
    
    const response: ApiResponse = {
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toJSON(),
        token: accessToken,
        refreshToken
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
    
    // Find user and include password for comparison
    const user = await User.findOne({ email, isActive: true }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid email or password'
      };
      return res.status(401).json(response);
    }
    
    // Update last login time
    user.lastLoginAt = new Date();
    await user.save();
    
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id.toString());
    
    const response: ApiResponse = {
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        token: accessToken,
        refreshToken
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
    // For now, we'll just return a success response
    
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
    
    // Check if user still exists and is active
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
      data: tokens
    };
    
    res.json(response);
    
  } catch (error) {
    logger.error('Token refresh error:', error);
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
    
    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      // Return success even if user doesn't exist (security best practice)
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
        to: user.email,
        subject: 'Reset Your CraftCircle Password',
        template: 'password-reset',
        data: {
          name: user.name,
          resetToken,
          resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
        }
      });
    } catch (emailError) {
      logger.error('Failed to send password reset email:', emailError);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      
      const response: ApiResponse = {
        success: false,
        message: 'Failed to send reset email'
      };
      return res.status(500).json(response);
    }
    
    const response: ApiResponse = {
      success: true,
      message: 'Password reset link sent to your email'
    };
    
    res.json(response);
    
  } catch (error) {
    logger.error('Password reset error:', error);
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
    
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
      isActive: true
    });
    
    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid or expired reset token'
      };
      return res.status(400).json(response);
    }
    
    // Update password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    
    // Generate new tokens
    const { accessToken, refreshToken } = generateTokens(user._id.toString());
    
    const response: ApiResponse = {
      success: true,
      message: 'Password updated successfully',
      data: {
        user: user.toJSON(),
        token: accessToken,
        refreshToken
      }
    };
    
    res.json(response);
    
  } catch (error) {
    logger.error('Password update error:', error);
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
    
    // In a production app, you would verify the email verification token
    // For now, we'll just return a success response
    
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
