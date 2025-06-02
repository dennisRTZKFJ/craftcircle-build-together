
/**
 * Validation Middleware
 * 
 * Provides request validation using express-validator.
 * Handles validation errors and returns consistent error responses.
 */

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ApiResponse, ValidationError } from '@/types';

/**
 * Validate Request Middleware
 * 
 * Checks for validation errors from express-validator and returns
 * a consistent error response if validation fails.
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const validationErrors: ValidationError[] = errors.array().map(error => ({
      field: error.type === 'field' ? error.path : 'unknown',
      message: error.msg,
      value: error.type === 'field' ? error.value : undefined
    }));
    
    const response: ApiResponse = {
      success: false,
      message: 'Validation failed',
      error: 'Invalid input data',
      data: {
        errors: validationErrors
      }
    };
    
    return res.status(400).json(response);
  }
  
  next();
};

/**
 * Sanitize Input Middleware
 * 
 * Basic input sanitization to prevent common attacks.
 * Should be used in combination with express-validator.
 */
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  // Remove any potential script tags from string fields
  const sanitizeString = (str: string): string => {
    if (typeof str !== 'string') return str;
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .trim();
  };
  
  // Recursively sanitize object properties
  const sanitizeObject = (obj: any): any => {
    if (obj === null || obj === undefined) return obj;
    
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    }
    
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    }
    
    if (typeof obj === 'object') {
      const sanitized: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          sanitized[key] = sanitizeObject(obj[key]);
        }
      }
      return sanitized;
    }
    
    return obj;
  };
  
  // Sanitize request body
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  
  // Sanitize query parameters
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  
  // Sanitize route parameters
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }
  
  next();
};
