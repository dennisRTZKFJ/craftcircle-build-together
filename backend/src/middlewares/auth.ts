
/**
 * Authentication Middleware
 * 
 * Provides middleware functions for:
 * - JWT token validation
 * - Role-based access control
 * - User authentication verification
 */

import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { AuthenticatedRequest, ApiResponse } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Authenticate JWT Token Middleware
 * 
 * Verifies JWT token from Authorization header and attaches user to request.
 * Can be used as either required authentication or optional authentication.
 * 
 * @param required - Whether authentication is required (default: true)
 */
export const authenticateToken = (required: boolean = true) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
      
      if (!token) {
        if (required) {
          const response: ApiResponse = {
            success: false,
            message: 'Access token is required'
          };
          return res.status(401).json(response);
        }
        return next(); // Optional authentication, continue without user
      }
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      // Get user from database
      const user = await User.findById(decoded.userId);
      if (!user || !user.isActive) {
        const response: ApiResponse = {
          success: false,
          message: 'Invalid or expired token'
        };
        return res.status(401).json(response);
      }
      
      // Attach user to request
      req.user = user;
      req.userId = user._id.toString();
      
      next();
      
    } catch (error) {
      logger.error('Token authentication error:', error);
      
      if (required) {
        const response: ApiResponse = {
          success: false,
          message: 'Invalid or expired token'
        };
        return res.status(401).json(response);
      }
      
      next(); // Optional authentication, continue without user
    }
  };
};

/**
 * Role-based Access Control Middleware
 * 
 * Restricts access based on user roles.
 * Must be used after authenticateToken middleware.
 * 
 * @param allowedRoles - Array of roles that are allowed access
 */
export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      const response: ApiResponse = {
        success: false,
        message: 'Authentication required'
      };
      return res.status(401).json(response);
    }
    
    if (!allowedRoles.includes(req.user.role)) {
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
 * Resource Owner or Admin Middleware
 * 
 * Allows access if user is the owner of the resource or has admin role.
 * Must be used after authenticateToken middleware.
 * 
 * @param getResourceOwnerId - Function to extract owner ID from request
 */
export const requireOwnershipOrAdmin = (
  getResourceOwnerId: (req: AuthenticatedRequest) => string | undefined
) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      const response: ApiResponse = {
        success: false,
        message: 'Authentication required'
      };
      return res.status(401).json(response);
    }
    
    const resourceOwnerId = getResourceOwnerId(req);
    const isOwner = resourceOwnerId === req.userId;
    const isAdmin = req.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
      const response: ApiResponse = {
        success: false,
        message: 'Access denied. You can only access your own resources.'
      };
      return res.status(403).json(response);
    }
    
    next();
  };
};

/**
 * Optional Authentication Middleware
 * 
 * Attempts to authenticate user but doesn't require it.
 * Useful for endpoints that behave differently for authenticated vs anonymous users.
 */
export const optionalAuth = authenticateToken(false);

/**
 * Admin Only Middleware
 * 
 * Shorthand for requiring admin role.
 */
export const adminOnly = [
  authenticateToken(),
  requireRole('admin')
];

/**
 * Creator or Admin Middleware
 * 
 * Shorthand for requiring creator or admin role.
 */
export const creatorOrAdmin = [
  authenticateToken(),
  requireRole('creator', 'admin')
];

/**
 * Partner or Admin Middleware
 * 
 * Shorthand for requiring partner or admin role.
 */
export const partnerOrAdmin = [
  authenticateToken(),
  requireRole('partner', 'admin')
];
