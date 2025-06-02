
/**
 * Authentication Routes
 * 
 * Handles all authentication-related endpoints:
 * - User registration
 * - User login
 * - Password reset
 * - Token refresh
 * - User logout
 */

import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  logout,
  refreshToken,
  resetPassword,
  updatePassword,
  verifyEmail
} from '@/controllers/authController';
import { validateRequest } from '@/middlewares/validation';
import { authenticateToken } from '@/middlewares/auth';

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user account
 * 
 * Body:
 * - name: string (required)
 * - email: string (required, valid email)
 * - password: string (required, min 6 characters)
 * - role?: 'user' | 'creator' | 'partner' (optional, defaults to 'user')
 */
router.post('/register', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['user', 'creator', 'partner'])
    .withMessage('Invalid role specified'),
  validateRequest
], register);

/**
 * POST /api/auth/login
 * Authenticate user and return JWT tokens
 * 
 * Body:
 * - email: string (required)
 * - password: string (required)
 */
router.post('/login', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validateRequest
], login);

/**
 * POST /api/auth/logout
 * Logout user (requires authentication)
 */
router.post('/logout', authenticateToken, logout);

/**
 * POST /api/auth/refresh-token
 * Refresh JWT access token using refresh token
 * 
 * Body:
 * - refreshToken: string (required)
 */
router.post('/refresh-token', [
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required'),
  validateRequest
], refreshToken);

/**
 * POST /api/auth/reset-password
 * Request password reset (sends email with reset link)
 * 
 * Body:
 * - email: string (required)
 */
router.post('/reset-password', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  validateRequest
], resetPassword);

/**
 * PUT /api/auth/update-password
 * Update password using reset token
 * 
 * Body:
 * - token: string (required)
 * - password: string (required, min 6 characters)
 */
router.put('/update-password', [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  validateRequest
], updatePassword);

/**
 * GET /api/auth/verify-email/:token
 * Verify user email address
 */
router.get('/verify-email/:token', verifyEmail);

export default router;
