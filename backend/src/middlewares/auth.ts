
/**
 * Authentication Middleware
 * 
 * Handles JWT token verification, role-based access control,
 * and ownership verification for protected routes.
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { AuthenticatedRequest, ApiResponse } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Interface for JWT payload
 */
interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * Authenticate JWT token middleware
 * Verifies the JWT token and attaches user info to request
 */
export const authenticateToken = (required: boolean = true) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

      if (!token) {
        if (!required) {
          return next(); // Continue without authentication for optional auth
        }
        
        const response: ApiResponse = {
          success: false,
          message: 'Access token required'
        };
        return res.status(401).json(response);
      }

      // Verify JWT token
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'fallback-secret'
      ) as JWTPayload;

      // Attach user info to request
      (req as AuthenticatedRequest).userId = decoded.userId;
      (req as AuthenticatedRequest).userRole = decoded.role;
      (req as AuthenticatedRequest).userEmail = decoded.email;

      // Verify user still exists and is active
      const user = await User.findById(decoded.userId).select('isActive role');
      if (!user || !user.isActive) {
        const response: ApiResponse = {
          success: false,
          message: 'User account not found or inactive'
        };
        return res.status(401).json(response);
      }

      next();

    } catch (error) {
      logger.error('Authentication error:', error);
      
      if (error instanceof jwt.JsonWebTokenError) {
        const response: ApiResponse = {
          success: false,
          message: 'Invalid access token'
        };
        return res.status(401).json(response);
      }

      if (error instanceof jwt.TokenExpiredError) {
        const response: ApiResponse = {
          success: false,
          message: 'Access token expired'
        };
        return res.status(401).json(response);
      }

      const response: ApiResponse = {
        success: false,
        message: 'Authentication failed'
      };
      res.status(500).json(response);
    }
  };
};

/**
 * Optional authentication middleware
 * Attempts to authenticate but doesn't fail if no token provided
 */
export const optionalAuth = authenticateToken(false);

/**
 * Role-based access control middleware
 * Restricts access based on user roles
 */
export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as AuthenticatedRequest).userRole;

    if (!userRole || !allowedRoles.includes(userRole)) {
      const response: ApiResponse = {
        success: false,
        message: 'Insufficient permissions'
      };
      return res.status(403).json(response);
    }

    next();
  };
};

/**
 * Ownership verification middleware
 * Ensures user can only access their own resources
 */
export const requireOwnershipOrAdmin = (getResourceUserId: (req: Request) => string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const resourceUserId = getResourceUserId(req);
      
      // Admin can access any resource
      if (authReq.userRole === 'admin') {
        return next();
      }

      // Check if user owns the resource
      if (authReq.userId !== resourceUserId) {
        const response: ApiResponse = {
          success: false,
          message: 'Access denied - you can only access your own resources'
        };
        return res.status(403).json(response);
      }

      next();

    } catch (error) {
      logger.error('Ownership verification error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Access verification failed'
      };
      res.status(500).json(response);
    }
  };
};

/**
 * Rate limiting middleware for sensitive operations
 */
export const rateLimitSensitive = () => {
  const attempts = new Map<string, { count: number; resetTime: number }>();
  
  return (req: Request, res: Response, next: NextFunction) => {
    const identifier = req.ip + (req as AuthenticatedRequest).userId;
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxAttempts = 5;

    const userAttempts = attempts.get(identifier);
    
    if (!userAttempts || now > userAttempts.resetTime) {
      attempts.set(identifier, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (userAttempts.count >= maxAttempts) {
      const response: ApiResponse = {
        success: false,
        message: 'Too many attempts. Please try again later.'
      };
      return res.status(429).json(response);
    }

    userAttempts.count++;
    next();
  };
};
